import MainLayout from "@/Components/Layout/MainLayout";
import { Head, Link, router } from "@inertiajs/react";
import { Product } from "@/types";
import { Filter, X } from "lucide-react";
import { useState } from "react";
import ProductCard from "@/Components/Product/ProductCard";

interface Pagination<T> {
    data: T[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    links: Array<{ url: string | null; label: string; active: boolean }>;
}

interface Filters {
    category?: string;
    brand?: string;
    search?: string;
}

interface ProductIndexProps {
    products: Pagination<Product>;
    categories: string[];
    brands: string[];
    filters: Filters;
}

const ProductIndex = ({ products, filters, categories, brands }: ProductIndexProps) => {

    const [isFilterOpen, setIsFilterOpen] = useState(false);

    const handleFilterChange = (key: string, value: string | null) => {
        const newFilters = { ...filters };

        if (value) {
            newFilters[key as keyof Filters] = value;
        } else {
            delete newFilters[key as keyof Filters];
        }

        router.get('/products', newFilters, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    const handleClearFilters = () => {
        router.get('/products', {}, {
            preserveState: true,
            preserveScroll: true,
        });
    }

    const hasActiveFilters = Object.keys(filters).length > 0;

    return (
        <MainLayout>
            <Head title="Products" />
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
                            Products
                        </li>
                    </ol>
                </nav>

                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">
                            Products
                        </h1>
                        <p className="text-gray-600">{products.total} Total Products</p>
                    </div>

                    <button
                        type="button"
                        onClick={() => setIsFilterOpen(!isFilterOpen)}
                        className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-primary-600 rounded-lg hover:bg-primary-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                    >
                        <Filter className="w-4 h-4" />
                        Filters
                    </button>
                </div>

                {/* Mobile overlay */}
                {isFilterOpen && (
                    <div
                        className="fixed inset-0 z-30 bg-opacity-50 lg:hidden"
                        onClick={() => setIsFilterOpen(false)}
                    />
                )}

                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Filter Sidebar */}
                    <aside className={`fixed top-0 left-0 bottom-0 z-40 bg-white p-6 w-64 transform transition-transform 
                        duration-300 ease-in-out lg:relative lg:translate-x-0 lg:bg-transparent lg:p-0 lg:w-1/4 
                        ${isFilterOpen ? 'translate-x-0' : '-translate-x-full'}`}>

                        {/* Mobile header */}
                        <div className="flex items-center justify-between mb-6 lg:hidden">
                            <h2 className="text-lg font-bold text-gray-900">
                                Filter
                            </h2>
                            <button
                                type="button"
                                onClick={() => setIsFilterOpen(false)}
                                className="text-gray-500 hover:text-gray-700"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Desktop header */}
                        <div className="hidden mb-6 lg:flex lg:items-center lg:justify-between">
                            <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                            {hasActiveFilters && (
                                <button
                                    type="button"
                                    onClick={handleClearFilters}
                                    className="text-sm text-primary-600 hover:text-primary-700"
                                >
                                    Clear All
                                </button>
                            )}
                        </div>

                        {/* Filter sections */}
                        <div className="space-y-6">
                            {/* Category filter */}
                            {categories.length > 0 && (
                                <div>
                                    <h3 className="font-medium text-gray-900 mb-3">Categories</h3>
                                    <div className="space-y-2">
                                        {categories.map((category) => (
                                            <button
                                                key={category}
                                                onClick={() => handleFilterChange('category', category)}
                                                className={`block w-full text-left px-3 py-2 rounded-md text-sm ${filters.category === category
                                                    ? 'bg-primary-50 text-primary-700'
                                                    : 'text-gray-700 hover:bg-gray-50'
                                                    }`}
                                            >
                                                {category}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Brand filter */}
                            {brands.length > 0 && (
                                <div>
                                    <h3 className="font-medium text-gray-900 mb-3">Brands</h3>
                                    <div className="space-y-2">
                                        {brands.map((brand) => (
                                            <button
                                                key={brand}
                                                onClick={() => handleFilterChange('brand', brand)}
                                                className={`block w-full text-left px-3 py-2 rounded-md text-sm ${filters.brand === brand
                                                    ? 'bg-primary-50 text-primary-700'
                                                    : 'text-gray-700 hover:bg-gray-50'
                                                    }`}
                                            >
                                                {brand}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>


                    </aside>

                    {/* Main content - Product listing */}
                    <div className="flex-1">
                        {/* Active filters display */}
                        {hasActiveFilters && (
                            <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                                <div className="flex flex-wrap gap-2">
                                    {filters.category && (
                                        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm bg-primary-100 text-primary-800">
                                            Category: {filters.category}
                                            <button
                                                onClick={() => handleFilterChange('category', null)}
                                                className="ml-1 text-primary-600 hover:text-primary-800"
                                            >
                                                <X className="w-3 h-3" />
                                            </button>
                                        </span>
                                    )}
                                    {filters.brand && (
                                        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm bg-primary-100 text-primary-800">
                                            Brand: {filters.brand}
                                            <button
                                                onClick={() => handleFilterChange('brand', null)}
                                                className="ml-1 text-primary-600 hover:text-primary-800"
                                            >
                                                <X className="w-3 h-3" />
                                            </button>
                                        </span>
                                    )}
                                    {filters.search && (
                                        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm bg-primary-100 text-primary-800">
                                            Search: {filters.search}
                                            <button
                                                onClick={() => handleFilterChange('search', null)}
                                                className="ml-1 text-primary-600 hover:text-primary-800"
                                            >
                                                <X className="w-3 h-3" />
                                            </button>
                                        </span>
                                    )}
                                    <button
                                        onClick={handleClearFilters}
                                        className="ml-auto text-sm text-primary-600 hover:text-primary-800"
                                    >
                                        Clear all
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* Product grid */}
                        {products.data.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                {products.data.map((product) => (
                                    <ProductCard
                                        key={product.id}
                                        product={product}
                                    />
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-12">
                                <p className="text-gray-500">No products found</p>
                                {hasActiveFilters && (
                                    <button
                                        onClick={handleClearFilters}
                                        className="mt-4 text-primary-600 hover:text-primary-700"
                                    >
                                        Clear filters to see all products
                                    </button>
                                )}
                            </div>
                        )}

                        {/* Pagination */}
                        {products.last_page > 1 && (
                            <div className="mt-8">
                                <div className="flex items-center justify-center space-x-2">
                                    {products.links.map((link, index) => (
                                        link.url ? (
                                            <a
                                                key={index}
                                                href={link.url}
                                                className={`px-3 py-2 rounded-md text-sm ${link.active
                                                    ? 'bg-primary-600 text-white'
                                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                                    }`}
                                                dangerouslySetInnerHTML={{ __html: link.label }}
                                            />
                                        ) : (
                                            <span
                                                key={index}
                                                className="px-3 py-2 text-gray-400"
                                                dangerouslySetInnerHTML={{ __html: link.label }}
                                            />
                                        )
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </MainLayout>
    );
};

export default ProductIndex;
