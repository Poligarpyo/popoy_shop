<?php
namespace App\Http\Controllers;


use App\Http\Controllers\Concerns\HandlesCart;
use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class CartController extends Controller
{
    use HandlesCart;
    public function index(): Response
    {
        $cart      = $this->getCart();
        $cartItems = $this->getCartWithProducts($cart);
        $subtotal  = $this->calculateSubTotal($cartItems);

        return Inertia::render("Cart", ['cartItems' => $cartItems, 'subtotal' => $subtotal]);

    }

    public function add(Request $request): RedirectResponse
    {
        $request->validate([
            "product_id" => "required|exists:products,id",
            "quantity"   => 'required|integer|min:1',

        ]);

        $product = Product::findOrFail($request->product_id);
        $cart    = $this->getCart();

        $existingItems = collect($cart)->firstWhere('id', $product->id);
        if ($existingItems) {
            $cart = collect($cart)->map(function ($item) use ($product, $request) {
                if ($item['id'] === $product->id) {
                    $newQuantity      = $item['quantity'] + $request->quantity;
                    $item['quantity'] = min($newQuantity, $product->stock);
                }
                return $item;
            })->toArray();
        } else {
            $cart[] = [
                "id"       => $product->id,
                'quantity' => min($request->quantity, $product->stock),
            ];
        }

        session(['cart' => $cart]);

        return redirect()->back()->with("success", "Product added to Cart");
    }

    public function update(Request $request, int $id): RedirectResponse
    {
        $request->validate([
            "quantity" => "required|integer|min:1",
        ]);

        $product = Product::findOrFail($id);
        $cart    = $this->getCart();

        $cart = collect($cart)->map(function ($item) use ($id, $request, $product) {
            if ($item['id'] === $id) {
                $item['quantity'] = min($request->quantity, $product->stock);
            }
            return $item;
        })->toArray();
        session(['cart' => $cart]);

        return redirect()->back();
    }

    public function getCart(): array
    {
        return session('cart', []);
    }



    public function remove(int $id): RedirectResponse
    {
        $cart = $this->getCart();
        $cart = collect($cart)->filter(fn($item) => $item['id'] !== $id)->values()->toArray();
        session(['cart' => $cart]);
        return redirect()->back()->with("success", "Items remove from Cart");
    }

    public function clear(): RedirectResponse
    {
        session()->forget('cart');
        return redirect()->back()->with("success", "Cart cleared");
    }

}
