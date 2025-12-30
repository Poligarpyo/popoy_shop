import MainLayout from '@/Components/Layout/MainLayout'
import { Head, Link, router } from '@inertiajs/react'
import React from 'react'
import { CartItem as CartItemType } from "@/types"
import { ArrowLeft, ShoppingBag, Trash2 } from 'lucide-react';
import ProductCard from '@/Components/Product/ProductCard';
import ProductGrid from '@/Components/Product/ProductGrid';
import CartItems from '@/Components/Cart/CartItems';

interface CartProps {
    cartItems: CartItemType[];
    subtotal: number;
}


const Cart = ({ cartItems, subtotal }: CartProps) => {




    const hanldeClearCart = () => {
        router.delete("/cart/clear", {
            preserveScroll: true,
        })
    }

    return (
        <MainLayout>
            <Head title='Shopping Cart' />
            <div className="px-4 py-8 mx-auto max-w-7xl sm:px-6 lg:px-8">
                <nav className="mb-6 mt-2">
                    <ol className="flex items-center space-x-2 text-sm text-gray-500 mb-4">
                        <li>
                            <Link
                                href="/"
                                className="text-gray-500 hover:text-gray-700"
                            >
                                Home
                            </Link>
                        </li>
                        <li className="text-gray-400">/</li>
                        <li
                            className="font-medium text-gray-900 truncate"
                            aria-current="page"
                        >
                            Cart
                        </li>
                    </ol>
                </nav>
                <div className='flex items-center justify-between mb-8'>
                    <h1 className='text-3xl font-bold'>Shopping Cart</h1>

                    {cartItems.length > 0 &&
                        <button
                            onClick={hanldeClearCart}
                            className='inline-flex items-center gap-2 px-4
                    py-4 text-sm font-medium text-red-700 transition-colors rounded-lg hover:bg-red-400'>
                            {" "}
                            <Trash2 className='w-4 h-4' />Clear Cart</button>}
                </div>

                {cartItems.length === 0 ? <div className='py-16 text-center'>
                    <ShoppingBag className='w-16 h-16 mx-auto mb-4 text-gray-300' />
                    <h2 className='text-gray-300'>Your cart is empty</h2>
                </div> : <div className='grid gap-8 lg:grid-cols-3'>
                    <div className='lg:col-span-2'>
                        <div className='space-y-4'>
                            {cartItems.map((item) =>
                                <CartItems item={item} key={item.id} />
                            )}
                        </div>
                        <div className='mt-6'>
                            <Link
                                href={"/products"}
                                className='inline-flex items-center gap-2
                            px-6 py-3 text-sm font-medium text-white
                            transition-colors rounded-2xl bg-primary-500
                            hover:bg-primary-700 '
                            >
                                <ArrowLeft />
                                Continue Shopping
                            </Link>
                        </div>
                    </div>

                    <div className='lg:col-span-1'>
                        <div className='sticky p-6 bg-white border border-gray-200 top-24 rounded-2xl'>
                            <h2 className='mb-4 text-lg font-semibold text-gray-600'>Order Summary</h2>
                            <div className=' space-y-3 '>
                                <div className='flex items-center justify-between text-sm '>
                                    <span className='text-gray-600'>Subtotal({cartItems.length} items) {" "}</span>
                                    <span className='text-gray-600'>SGD {subtotal.toFixed(2)}</span>
                                </div>
                                <div className='flex items-center justify-between'>
                                    <span className='text-lg font-semibold text-gray-700'>Shipping</span>
                                    <span className='text-lg font-semibold text-primary-700'>Free</span>
                                </div>
                                <div className='pt-4 mt-4 border-t-2 border-gray-100'>
                                    <div className='flex items-center justify-between'>
                                        <span className='text-lg font-semibold text-gray-900'>Total</span>
                                        <span className='text-lg font-bold text-primary-400-900'>SGD{" "}{Number(subtotal).toFixed(2)}</span>
                                    </div>
                                </div>
                                <Link href={'/checkout'} className='flex items-center justify-center w-full gap-2 px-6 py-3 mt-6
                                font-medium text-white bg-primary-600 rounded-lg transition-colors hover:bg-primary-700'>
                                    Proceed to Checkout
                                </Link>
                                <p className='mt-4 text-xs text-center text-gray-600'>Secure Checkout powered by Hitpay</p>
                            </div>

                        </div>
                    </div>


                </div>

                }
            </div>
        </MainLayout>
    )
}

export default Cart