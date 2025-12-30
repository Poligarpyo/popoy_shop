import { CartItem as CartItemType } from "@/types";
import { router } from "@inertiajs/react";
import { Minus, Plus, Trash2Icon } from "lucide-react";

interface CartItemsProps {
    item: CartItemType;
}
const CartItems = ({ item }: CartItemsProps) => {
    const handleQuantityChange = (delta: number) => {
        const newQuantity = item.quantity + delta;
        if (newQuantity >= 1 && newQuantity <= item.product.stock) {
            router.patch(
               `/cart/update/${item.id}`,
                { quantity: newQuantity },
                { preserveScroll: true }
            );
        }
    };

    const handleRemove = () => {
        router.delete(`/cart/remove/${item.id}`,
            { preserveScroll: true }
        )
    }

    const subTotal = Number(item.product.price) * item.quantity;

    return <article className="flex gap-4 p-4 bg-white border border-gray-100 rounded-xl">
        <div
            className="shrink-0 w-24 h-24 overflow-hidden bg-gray-300 rounded-lg"

        >
            <img
                className="object-cover w-full h-full"
                src={`/storage/${item.product.image}`} alt={item.product.name} />
        </div>
        <div className="flex flex-col flex-1 min-w-0">
            <div className="flex items-center justify-between gap-4">
                <div>
                    {item.product.brand && <p className="text-sm font-medium text-gray-600 uppercase">{item.product.brand}</p>}
                    <h3 className="font-medium text-gray-600 truncate">{item.product.name}</h3>
                    <p className="text-sm text-primary-700">{Number(item.product.price).toFixed(2)}</p>
                </div>
                <button
                    type="button"
                    onClick={handleRemove}
                    className="p-2 text-gray-700 transition-colors rounded-lg hover:text-red-700"
                >
                    <Trash2Icon className="w-4 h-4" />
                </button>
            </div>
            <div className="flex items-center justify-between mt-auto">
                <div className="flex items-center border border-gray-200 rounded-lg">
                    <button
                        className="p-2 text-gray-600 transition-colors hover:text-primary-600 disabled:text-gray-300"
                        onClick={() => handleQuantityChange(-1)}
                        tabIndex={0}
                    ><Minus /></button>
                    <span className="w-8 text-sm text-center font-medium text-gray-900">{item.quantity}</span>
                    <button
                        className="p-2 text-gray-600 transition-colors hover:text-primary-600 disabled:text-gray-300"
                        onClick={() => handleQuantityChange(1)}
                        tabIndex={0}
                    ><Plus /></button>
                </div>
                <p>{subTotal.toFixed(2)}</p>
            </div>
        </div>
    </article>;
};

export default CartItems;
