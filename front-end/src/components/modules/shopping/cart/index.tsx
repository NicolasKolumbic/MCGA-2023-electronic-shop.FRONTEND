'use client'
import { ShoppingCart } from "@/models/shopping-cart";

const CartDetail = (product: ShoppingCart) => {
    return (
        <div>
                <li key={product.id}>
                    {product.description} cantidad: {product.quantity} ${product.price}
                </li>
        </div>
    )
}

export default CartDetail;
