<?php
namespace App\Http\Controllers;

use App\Http\Controllers\Concerns\HandlesCart;
use App\Models\Order;
use App\Models\OrderItem;
use App\Services\HitPayServices;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;
use Inertia\Response;
use Symfony\Component\HttpFoundation\Response as SymfonyResponse;

class CheckoutController extends Controller
{
    use HandlesCart;

    public function __construct(
        private readonly HitPayServices $hitPayService
    ) {}

    /* ==============================
     |  Checkout Page
     ============================== */
    public function index(): Response | RedirectResponse
    {
        $cart = session('cart', []);

        if (empty($cart)) {
            return redirect()
                ->route('cart.index')
                ->with('error', 'Your cart is empty.');
        }

        $cartItems = $this->getCartWithProducts($cart);

        return Inertia::render('Checkout', [
            'cartItems' => $cartItems,
            'subtotal'  => $this->calculateSubTotal($cartItems),
        ]);
    }

    /* ==============================
     |  Process Checkout
     ============================== */
    public function process(Request $request): RedirectResponse | SymfonyResponse
    {
        $validated = $this->validateCheckout($request);
        $cart      = session('cart', []);

        if (empty($cart)) {
            return redirect()
                ->route('cart.index')
                ->with('error', 'Your cart is empty.');
        }

        $cartItems = $this->getCartWithProducts($cart);
        $subtotal  = $this->calculateSubTotal($cartItems);

        DB::beginTransaction();

        try {
            $order = $this->createOrder($validated, $subtotal);
            $this->createOrderItems($order, $cartItems);

            $paymentUrl = $this->hitPayService->createPaymentRequest($order);

            if (! $paymentUrl) {
                throw new \Exception('Failed to create payment request.');
            }

            if (! $paymentUrl) {
                Log::error('Payment URL is null, cannot redirect');
                return redirect()->back()->with('error', 'Payment gateway is not available.');
            }

            if ($paymentUrl) {
                Log::info('Payment URL generated successfully', [
                    'payment_url' => $paymentUrl,
                ]);
            }

            $order->update([
                'hitpay_payment_request_id' => $this->hitPayService->getLastPaymentRequestId(),
            ]);

            DB::commit();
            session()->forget('cart');

            return Inertia::location($paymentUrl);

        } catch (\Throwable $e) {
            DB::rollBack();

            Log::error('Checkout error', [
                'message' => $e->getMessage(),
                'trace'   => $e->getTraceAsString(),
            ]);

            return redirect()
                ->back()
                ->with('error', 'An error occurred. Please try again.');
        }
    }

    /* ==============================
     |  Payment Result Pages
     ============================== */
    public function success(Request $request): Response
    {
        return Inertia::render('Payment/Success', [
            'reference' => $request->query('reference'),
        ]);
    }

    public function failed(Request $request): Response
    {   
        $reference = $request->query('reference');
        return Inertia::render('Payment/Failed', [
            'reference' => $reference,
        ]);
    }

    /* ==============================
     |  HitPay Webhook
     ============================== */
    public function webhook(Request $request): \Illuminate\Http\Response
    {
        $payload   = $request->all();
        $signature = $request->header('X-HITPAY-SIGNATURE', '');

        if (! $this->hitPayService->verifyWebHook($payload, $signature)) {
            Log::warning('Invalid HitPay webhook signature');
            return response('Invalid signature', 401);
        }

        $paymentRequestId = $payload['payment_request_id'] ?? null;
        $status           = $payload['status'] ?? null;

        if (! $paymentRequestId || ! $status) {
            return response('Missing data', 400);
        }

        $order = Order::where(
            'hitpay_payment_request_id',
            $paymentRequestId
        )->first();

        if (! $order) {
            Log::warning('Order not found for payment request', [
                'payment_request_id' => $paymentRequestId,
            ]);
            return response('Order not found', 404);
        }

        $this->updateOrderPaymentStatus($order, $payload, $status);

        return response('Payment processed', 200);
    }

    /* ==============================
     |  Helper Methods
     ============================== */

    private function validateCheckout(Request $request): array
    {
        return $request->validate([
            'name'    => 'required|string|max:255',
            'email'   => 'required|email|max:255',
            'phone'   => 'nullable|string|max:20',
            'address' => 'required|string|max:500',
        ]);
    }

    private function createOrder(array $data, float $subtotal): Order
    {
        return Order::create([
            'order_number'     => Order::generateOrderNumber(),
            'guest_name'       => $data['name'],
            'guest_email'      => $data['email'],
            'guest_phone'      => $data['phone'] ?? null,
            'shipping_address' => $data['address'],
            'subtotal'         => $subtotal,
            'total'            => $subtotal,
            'currency'         => 'SGD',
            'status'           => 'pending',
        ]);
    }

    private function createOrderItems(Order $order, array $cartItems): void
    {
        foreach ($cartItems as $item) {
            OrderItem::create([
                'order_id'     => $order->id,
                'product_id'   => $item['product']['id'],
                'product_name' => $item['product']['name'],
                'price'        => $item['product']['price'],
                'quantity'     => $item['quantity'],
                'subtotal'     => $item['product']['price'] * $item['quantity'],
            ]);
        }
    }

    private function updateOrderPaymentStatus(
        Order $order,
        array $payload,
        string $status
    ): void {
        if ($status === 'completed') {
            $order->update([
                'status'         => 'paid',
                'hit_payment_id' => $payload['payment_id'] ?? null,
                'paid_at'        => now(),
            ]);
        }

        if (in_array($status, ['failed', 'expired'], true)) {
            $order->update([
                'status' => 'failed',
            ]);
        }
    }
}
