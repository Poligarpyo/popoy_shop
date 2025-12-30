import { Link } from "@inertiajs/react"

const Footer = () => {
    return (
        <footer className="bg-gray-800 text-white mt-auto">
            <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                <div className="grid gap-8 md:grid-cols-4">
                    <div className="md:col-span-2">
                        <Link href="/" className="text-2xl font-bold">LaraStore</Link>
                        <p className="max-w-md mt-4 text-sm text-gray-400">
                            A Modern e-commerce platform built with Laravel and React. 
                            Experience seamless shopping and secure payments.
                        </p>
                    </div>

                    <div>
                        <h3 className="mb-4 text-white font-semibold tracking-wider uppercase text-sm">
                            Quick Links
                        </h3>
                        <ul className="space-y-3">
                            <li> 
                                <Link href="/" className="text-gray-400 transition-colors text-sm hover:text-white">Home</Link>
                            </li>
                            <li> 
                                <Link href="/products" className="text-gray-400 transition-colors text-sm hover:text-white">Products</Link>
                            </li>
                            <li> 
                                <Link href="/cart" className="text-gray-400 transition-colors text-sm hover:text-white">Cart</Link>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="mb-4 text-white font-semibold tracking-wider uppercase text-sm">
                            Support
                        </h3>
                        <ul className="space-y-3">
                            <li> 
                                <Link href="#" className="text-gray-400 transition-colors text-sm hover:text-white">Contact Us</Link>
                            </li>
                            <li> 
                                <Link href="#" className="text-gray-400 transition-colors text-sm hover:text-white">FAQ</Link>
                            </li>
                        </ul>
                    </div>
                </div>
                
                <div className="mt-12 pt-8 border-t border-gray-700">
                    <p className="text-center text-gray-400 text-sm">
                        © {new Date().getFullYear()} LaraStore. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    )
}

export default Footer
