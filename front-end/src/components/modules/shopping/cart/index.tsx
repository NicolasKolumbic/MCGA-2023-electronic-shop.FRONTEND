'use client'
import { ShoppingCart } from "@/models/shopping-cart";
import styles from "./cart.module.css";

const CartDetail = (product: ShoppingCart) => {
    return (
        <div>
                <div className={styles["cart"]}>
                    <h5>{product.description}</h5>
                    <p>cantidad: {product.quantity}</p> 
                    <span>${product.price}</span>
                </div>
        </div>
    )
}

export default CartDetail;
