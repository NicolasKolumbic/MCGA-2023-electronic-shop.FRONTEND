'use client'
import { ShoppingCart } from "@/models/shopping-cart";

const CartDetail = (product: ShoppingCart) => {
    return (
        <div>
                <li key={product.id}>
                    {product.description} - Quantity: 1
                </li>
        </div>
    )
}

export default CartDetail;
