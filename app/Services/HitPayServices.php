<?php
namespace App\Services;

use App\Models\Order;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class HitPayServices
{
    private string $apiKey;
    private string $apiUrl;
    private ?string $lastPaymentRequestId = null;

    // ✅ FIX 1: Correct constructor name
    public function __construct()
    {
        $this->apiKey = config('services.hitpay.api_key', '');
        $this->apiUrl = config('services.hitpay.sandbox', true)
            ? 'https://api.sandbox.hit-pay.com/v1'
            : 'https://api.hit-pay.com/v1';
    }

    /* ==============================
     |  Create Payment Request
     ============================== */
    public function createPaymentRequest(Order $order): ?string
    {
        if (empty($this->apiKey)) {
            Log::error('HitPay API key is not configured');
            return null;
        }

        try {
            $http = Http::withHeaders([
                'X-BUSINESS-API-KEY' => $this->apiKey,
            ]);

            if (config('services.hitpay.sandbox', false)) {
                $http = $http->withoutVerifying();
            }

            $payload = [
                'amount'                  => number_format($order->total, 2, '.', ''),
                'currency'                => $order->currency,
                'email'                   => $order->guest_email,
                'name'                    => $order->guest_name,
                'purpose'                 => 'Order #' . $order->order_number,
                'reference_number'        => $order->order_number,
                'redirect_url'            => route('payment.success', [
                    'reference' => $order->order_number,
                ]),
                'redirect_url_fail'       => route('payment.failed', ['reference' => $order->order_number]),
                'allow_repeated_payments' => false,
            ];

            $webhookUrl = route('webhook.hitpay', [], true);
            if (! str_contains($webhookUrl, 'localhost') && ! str_contains($webhookUrl, '127.0.0.1')) {
                $payload['webhook'] = $webhookUrl;
            } else {
                Log::info('Skipping webhook because localhost cannot be used');
            }

            $response = $http->asForm()->post($this->apiUrl . '/payment-requests', $payload);

            if (! $response->successful()) {
                Log::error('HitPay API error', [
                    'status' => $response->status(),
                    'body'   => $response->body(),
                ]);
                return null;
            }

            $data = $response->json();

            $this->lastPaymentRequestId = $data['id'] ?? null;

            return $data['url'] ?? null;

        } catch (\Throwable $e) {
            Log::error('HitPay API Exception', [
                'message' => $e->getMessage(),
            ]);
            return null;
        }
    }

    /* ==============================
     |  Getter used by Controller
     ============================== */
    public function getLastPaymentRequestId(): ?string
    {
        return $this->lastPaymentRequestId;
    }

    /* ==============================
     |  Verify Webhook Signature
     ============================== */
    public function verifyWebHook(array $payload, string $signature): bool
    {
        $salt = config('services.hitpay.salt', '');

        if (empty($salt)) {
            Log::warning('HitPay webhook salt is not configured');
            return false;
        }

        if (empty($signature)) {
            Log::warning('HitPay webhook signature is missing');
            return false;
        }

        /**
         * Optional security check:
         * HitPay signatures are SHA256 hex strings (64 chars)
         */
        if (! ctype_xdigit($signature) || strlen($signature) !== 64) {
            Log::warning('HitPay webhook signature format is invalid', [
                'signature' => $signature,
            ]);
            return false;
        }

        // Copy payload and remove signature field if present
        $data = $payload;
        unset($data['hmac'], $data['signature']);

        // Sort keys alphabetically (required by HitPay)
        ksort($data);

        // Build data string
        $dataString = '';
        foreach ($data as $key => $value) {
            if (is_array($value) || is_object($value)) {
                continue;
            }

            // ✅ FIX: correct concatenation
            $dataString .= $key . $value;
        }

        // Generate HMAC
        $calculatedSignature = hash_hmac(
            'sha256',
            $dataString,
            $salt
        );

        return hash_equals($calculatedSignature, $signature);
    }

}
