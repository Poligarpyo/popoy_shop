import { Product } from "@/types";
import ProductCard from "./ProductCard";

interface ProductGridProps {
    products: Product[];
    title?: string;
}

const ProductGrid = ({ products, title }: ProductGridProps) => {
    if (products.length === 0) {
        return <p className="text-center">No products found.</p>;
    }
    return (
        <section>
            {title && <h2 className="text-2xl font-bold mb-4">{title}</h2>}
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </section>
    );
};

export default ProductGrid;
