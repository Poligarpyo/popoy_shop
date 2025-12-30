<?php

use App\Http\Controllers\ProductController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\CheckoutController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', [ProductController::class, 'home'])->name('home');
Route::get("/products", [ProductController::class, "index"])->name("products.index");
Route::get("/products/{slug}", [ProductController::class, "show"])->name("products.show");



Route::get("/cart", [CartController::class, "index"])->name("cart.index");
Route::post("/cart/add", [CartController::class, "add"])->name("cart.add");
Route::patch("/cart/update/{id}", [CartController::class, "update"])->name("cart.update");
Route::delete("/cart/remove/{id}", [CartController::class, "remove"])->name("cart.remove");
Route::delete("/cart/clear", [CartController::class, "clear"])->name("cart.clear");

Route::get("/checkout", [CheckoutController::class, "index"])->name("checkout.index");
Route::post("/checkout", [CheckoutController::class, "process"])->name("checkout.process");
Route::get("/payment/success", [CheckoutController::class, "success"])->name("payment.success");
Route::get("/payment/failed", [CheckoutController::class, "failed"])->name("payment.failed");
Route::post("/webhook/hitpay", [CheckoutController::class, "webhook"])->name("webhook.hitpay");

 

require __DIR__.'/auth.php';
