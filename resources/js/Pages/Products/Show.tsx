import MainLayout from "@/Components/Layout/MainLayout";
import { Product } from "@/types";
import { Head, Link, router } from "@inertiajs/react";
import { ArrowLeft, Minus, Plus, ShoppingCart } from "lucide-react";
import { useState } from "react";

interface ProductShowProps {
    product: Product;
    relatedProducts: Product[];
}

const ProductShow = ({ product, relatedProducts }: ProductShowProps) => {
    const [quantity, setQuantity] = useState(1);

    const handleQuantityChange = (delta: number) => {
        const newQuantity = quantity + delta;
        if (newQuantity < 1) return;
        setQuantity(newQuantity);
    };

    const handleAddToCart = () => {
        // Implement add to cart functionality
        router.post(
            "/cart/add",
            { product_id: product.id, quantity: quantity },
            {
                preserveScroll: true,
            }
        );
    };

    return (
        <MainLayout>
            <Head title={product.name} />

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
                                href={"/products"}
                                className="text-gray-500 hover:text-gray-700"
                            >
                                Products
                            </Link>
                        </li>
                        <li className="text-gray-400">/</li>
                        <li
                            aria-current="page"
                            className="font-medium text-gray-900 truncate"
                        >
                            {product.name}
                        </li>
                    </ol>
                </nav>
                <Link
                    href={"/products"}
                    className="text-blue-500 hover:text-blue-700"
                >
                    <ArrowLeft className="inline-block w-4 h-4 mr-1" />
                    Back to Products
                </Link>
                <div className="grid gap-8 lg:grid-cols-2">
                    <div className="relative overflow-hidden bg-gray-50 rounded-2xl aspect-square">
                        {product.is_new && (
                            <span className="absolute top-2 left-2 bg-green-500 text-white text-xs font-semibold px-2 py-1 rounded">
                                New Arrival
                            </span>
                        )}
                        <img
                            src={`/storage/${product.image}`}
                            alt={product.name}
                            className="object-cover w-full h-full"
                        />
                    </div>
                    <div className="flex flex-col">
                        {product.brand && (
                            <p className="text-sm text-gray-500 mb-2 ">
                                {product.brand}
                            </p>
                        )}

                        <h1 className="mb-4 text-3xl font-bold text-gray-900">
                            {product.name}
                        </h1>
                        <p className="mb-6 text-xl font-semibold text-primary-600">
                            ${product.price}
                        </p>
                        <div className="prose prose-lg max-w-none mb-8">
                            <span
                                className={`${product.stock > 10
                                    ? `bg-green-100 text-green-800`
                                    : product.stock > 0
                                        ? `bg-green-100 text-red-800`
                                        : "bg-red-100 text-red-800"
                                    }`}
                            >
                                {product.stock > 10
                                    ? `In Stock (${product.stock})`
                                    : product.stock > 0
                                        ? `Low Stock (${product.stock})`
                                        : "Out of Stock"}
                            </span>
                        </div>
                        <p className="mb-8 leading-relaxed text-gray-500">
                            {product.description}
                        </p>
                        <div className="flex flex-row gap-4 sm:flex-row">
                            <div className="flex items-center border border-gray-300 rounded-2xl">
                                <button
                                    onClick={() => handleQuantityChange(-1)}
                                    tabIndex={0}
                                >
                                    <Minus className="w-4 h-4" />
                                </button>
                                <span className="px-4 text-sm">{quantity}</span>
                                <button
                                    onClick={() => handleQuantityChange(1)}
                                    tabIndex={0}
                                >
                                    <Plus className="w-4 h-4" />
                                </button>
                            </div>
                            <button
                                onClick={() => handleAddToCart()}
                                disabled={product.stock === 0}
                                className="px-6 py-3 bg-blue-500 text-white rounded-2xl hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                            >
                                <ShoppingCart className="inline-block w-4 h-4 mr-2" />
                                {product.stock === 0 ? " (Unavailable)" : "Add to Cart"}
                            </button>
                        </div>

                        <div className="pt-8 mt-8 border-t border-gray-50">
                            <dl className="space-y-3">
                                <div className="flex gap-2 text-sm">
                                    <dt className="font-medium text-gray-900 ">
                                        Category:
                                    </dt>
                                    <dd className="text-gray-400 ">
                                        {product.category}
                                    </dd>
                                </div>
                                {product.brand && <div className="flex gap-2 text-sm">
                                    <dt className="font-medium text-gray-900 ">
                                        Brand:
                                    </dt>
                                    <dd className="text-gray-400 ">
                                        {product.brand}
                                    </dd>
                                </div>}
                            </dl>
                        </div>
                    </div>
                </div>
                {relatedProducts.length > 0 && (
                    <div className="mt-16">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">
                            Related Products
                        </h2>
                        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                            {relatedProducts.map((relatedProduct) => (
                                <Link
                                    key={relatedProduct.id}
                                    href={`/products/${relatedProduct.slug}`}
                                    className="block"
                                >
                                    <div className="overflow-hidden bg-white rounded-lg shadow-md hover:shadow-lg">
                                        <img
                                            src={relatedProduct.image}
                                            alt={relatedProduct.name}
                                            className="object-cover w-full h-48"
                                        />
                                        <div className="p-4">
                                            <h3 className="text-lg font-medium text-gray-900">
                                                {relatedProduct.name}
                                            </h3>
                                            <p className="text-gray-500">
                                                ${relatedProduct.price}
                                            </p>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </MainLayout>
    );
};

export default ProductShow;
