import { Link, usePage } from '@inertiajs/react'
import { useState } from 'react'
import { PageProps } from '@/types'
import { Menu, Search, SearchCheckIcon, ShoppingCart, X } from 'lucide-react';

const Header = () => {

    const { cart = [] } = usePage<PageProps>().props;
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);

    const cartItemsCount = cart.reduce((total, item) => total + item.quantity, 0);

    // handler function
    const handleMenuToggle = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const handleSearchToggle = () => {
        setIsSearchOpen(!isSearchOpen);
    }


    return (

        <header className="sticky top-0 z-50 bg-white shadow">
            <div className='px-4 mx-auto max-w-7x1 sm:px-6 lg:px-8'>
                <div className='flex items-center justify-center h-16'>
                    <div className='flex items-center gap-8'>
                        <Link href="/" className="text-lg font-bold text-secondary-800">
                            MyShop
                        </Link>
                        <nav className='hidden md:flex space-x-4'>
                            <Link href="/" className="text-gray-600 hover:text-primary-800">
                                Home
                            </Link>
                            <Link href="/products" className="text-gray-600 hover:text-primary-800">
                                Products
                            </Link>

                        </nav>
                    </div>
                    <div className='flex items-center ml-auto gap-4'>
                        <button
                            onClick={handleSearchToggle}
                            className="text-gray-600 hover:text-primary-800 relative"
                        >
                            <Search className="w-5 h-5" />
                        </button>


                        <Link href={"/cart"} className="relative text-gray-600 hover:text-primary-800">
                            <ShoppingCart className="  w-5 h-5" />
                            {cartItemsCount > 0 && (
                                <span className="absolute flex -top-1 -right-1 items-center justify-center w-5 h-5
                                 text-xs font-medium  text-white bg-red-600 rounded-full ">
                                    {2}
                                </span>
                            )}
                        </Link>

                        <button
                            onClick={handleMenuToggle}
                            type='button'
                            className='md:hidden p-2 text-gray-600
                         hover:text-primary-800 transition-colors rounded-lg
                          hover:bg-gray-100'>
                            {isMenuOpen ? (
                                <X className="w-5 h-5" />
                            ) : (
                                <Menu className="w-5 h-5" />
                            )}
                        </button>
                    </div>
                </div>

                {isSearchOpen && (
                    <div className="py-4 border-t border-gray-100">
                        <div className="relative">
                            <Search className="w-5 h-5 absolute text-gray-300 transform -translate-y-1/2 left-3 top-1/2" />
                            <input
                                type="text" 
                                placeholder="Search products..."
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"    
                            />
                        </div>
                    </div>

                )}


                {isMenuOpen && (
                    <nav
                        className='py-4 border-t border-gray-200 md:hidden '
                        role='navigation'
                        aria-label='Mobile navigation'
                    >
                        <div>
                            <Link className="block py-2 text-gray-600 hover:text-primary-800">
                                Home
                            </Link>
                            <Link className="block py-2 text-gray-600 hover:text-primary-800">
                                Products
                            </Link>
                        </div>
                    </nav>
                )}
            </div>
        </header>
    )

};

export default Header