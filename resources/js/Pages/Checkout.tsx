import MainLayout from '@/Components/Layout/MainLayout';
import { CartItem } from '@/types'
import { Head, Link, useForm } from '@inertiajs/react';

import React, { FormEvent } from 'react'


interface CheckoutProps {
    cartItems: CartItem[];
    subtotal: number;
}

const Checkout = ({ cartItems, subtotal }: CheckoutProps) => {

    const { data, setData, post, processing, errors } = useForm({
        name: "",
        email: "",
        phone: "",
        address: "",
    });

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        post('/checkout');
    };



    return (
        <MainLayout>
            <Head title='Checkout' />
            <div className="px-4 py-8 mx-auto max-w-7xl sm:px-6 lg:px-8">
                <nav className="mb-6 mt-2">
                    <ol className="flex items-center gap-2 text-sm">
                        <li>
                            <Link
                                href="/"
                                className="text-gray-500 hover:text-gray-700"
                            >
                                Home
                            </Link>
                        </li>
                        <li className="text-gray-400">/</li>
                        <li>
                            <Link
                                href={"/cart"}
                                className="text-gray-500 hover:text-gray-700"
                            >
                                Cart
                            </Link>
                        </li>
                        <li className="text-gray-400">/</li>
                        <Link
                            href={"/checkout"}
                            className="text-gray-900 hover:text-gray-700"
                        >
                            Checkout
                        </Link>

                    </ol>
                    <br></br>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* ================= LEFT: FORM ================= */}
                        <div className="lg:col-span-2">
                            <h1 className="mb-8 text-3xl font-bold text-gray-900">
                                Checkout
                            </h1>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                {/* Full Name */}
                                <div>
                                    <label className="block mb-1 text-sm font-medium text-gray-700">
                                        Full Name
                                    </label>
                                    <input
                                        type="text"
                                        value={data.name}
                                        onChange={e => setData('name', e.target.value)}
                                        className="w-full rounded-lg border border-gray-300 px-4 py-2"
                                    />
                                    {errors.name && (
                                        <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                                    )}
                                </div>

                                {/* Email */}
                                <div>
                                    <label className="block mb-1 text-sm font-medium text-gray-700">
                                        Email Address
                                    </label>
                                    <input
                                        type="email"
                                        value={data.email}
                                        onChange={e => setData('email', e.target.value)}
                                        className="w-full rounded-lg border border-gray-300 px-4 py-2"
                                    />
                                    {errors.email && (
                                        <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                                    )}
                                </div>

                                {/* Phone */}
                                <div>
                                    <label className="block mb-1 text-sm font-medium text-gray-700">
                                        Phone
                                    </label>
                                    <input
                                        type="tel"
                                        value={data.phone}
                                        onChange={e => setData('phone', e.target.value)}
                                        className="w-full rounded-lg border border-gray-300 px-4 py-2"
                                    />
                                </div>

                                {/* Address */}
                                <div>
                                    <label className="block mb-1 text-sm font-medium text-gray-700">
                                        Address
                                    </label>
                                    <textarea
                                        value={data.address}
                                        onChange={e => setData('address', e.target.value)}
                                        className="w-full rounded-lg border border-gray-300 px-4 py-2"
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="w-full rounded-lg bg-indigo-600 px-6 py-3
                           text-white font-semibold hover:bg-indigo-700
                           disabled:opacity-50"
                                >
                                    {processing ? 'Processing...' : 'Proceed to Payment'}
                                </button>
                            </form>
                        </div>

                        {/* ================= RIGHT: ORDER SUMMARY ================= */}
                        <div className="bg-gray-50 rounded-xl p-6 h-fit">
                            <h2 className="mb-6 text-xl font-semibold text-gray-900">
                                Order Summary
                            </h2>

                            <div className="space-y-4">
                                {cartItems.map((item) => (
                                    <div
                                        key={item.id}
                                        className="flex items-center justify-between"
                                    >
                                        <div>
                                            <p className="font-medium text-gray-800">
                                                {item.product.name}
                                            </p>
                                            <p className="text-sm text-gray-500">
                                                Qty: {item.quantity}
                                            </p>
                                        </div>

                                        <p className="font-medium text-gray-900">
                                            ₱{(item.product.price * item.quantity).toFixed(2)}
                                        </p>
                                    </div>
                                ))}
                            </div>

                            <div className="my-6 border-t" />

                            <div className="space-y-2 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Subtotal</span>
                                    <span className="font-medium">
                                        ₱{subtotal.toFixed(2)}
                                    </span>
                                </div>

                                <div className="flex justify-between text-lg font-semibold">
                                    <span>Total</span>
                                    <span>
                                        ₱{subtotal.toFixed(2)}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>



                </nav>
            </div>
        </MainLayout>
    )
}

export default Checkout