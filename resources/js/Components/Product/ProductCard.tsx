import { Product } from "@/types";
import { Link, router } from "@inertiajs/react";
import { ShoppingBag, ShoppingCart } from "lucide-react";

interface ProductCardProps {
    product: Product;
}
const ProductCard = ({ product }: ProductCardProps) => {


    const handleAddToCart = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        router.post('/cart/add', { product_id: product.id, quantity: 1 }, {
            preserveScroll: true,
        });
    }
    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' || e.key === ' ') {
            router.post('/cart/add', { product_id: product.id, quantity: 1 }, {
                preserveScroll: true,
            });
        }

    }
    return (
        <article className="relative bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-300">
            {product.is_new && (
                <span className="absolute top-2 left-2 bg-green-500 text-white text-xs font-semibold px-2 py-1 rounded">
                    New Arrival
                </span>
            )}

            <Link href={`/products/${product.slug}`} className="block">
                <div className=" relative overflow-hidden aspect-square bg-gray-50 p-4">
                    <span className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 bg-black bg-opacity-25 transition-opacity duration-300">
                        <ShoppingBag className="w-8 h-8 text-white" />
                    </span>
                    <img
                         src={`/storage/${product.image}`}
                        alt={product.name}
                        className="w-full h-full object-contain"
                    />
                </div>
                <div className="p-4">
                    {product.brand && (
                        <p className="text-sm text-gray-500 mb-1 ">
                            {product.brand}
                        </p>
                    )}
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        {product.name}
                    </h3>
                    <p className="text-primary-600 font-bold text-md">
                        ${product.price}
                    </p>
                    {product.stock > 0 && product.stock < 30 && (
                        <span className="mt-2 text-sm text-red-500 ">
                            Only {product.stock} left in stock
                        </span>
                    )}
                </div>
            </Link>
            <div className="px-4 pb-4">
                <button
                    type="button"
                    onClick={handleAddToCart}
                    onKeyDown={handleKeyDown}
                    disabled={product.stock === 0}
                    className={`inline-flex items-center justify-center w-full 
                        px-4 py-2 text-sm font-medium text-white bg-primary-600
                         rounded-lg hover:bg-primary-500 focus:outline-none 
                         focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed
                         disabled:bg-primary-600
                         `}
                >
                    <ShoppingCart className="w-4 h-4" />
                    {product.stock === 0 ? (
                        <span className="ml-2 text-sm text-gray-500">
                            Out of Stock
                        </span>
                    ) : (
                        <span className="ml-2 text-sm font-medium text-primary-600">
                            Add to Cart
                        </span>
                    )}
                </button>
            </div>
        </article>
    );
};

export default ProductCard;
