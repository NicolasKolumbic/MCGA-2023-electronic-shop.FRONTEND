import { ShoppingCart } from "@/models/shopping-cart";

export class ShoppingCartForSale {
    products: Map<ShoppingCart, Number> = new Map();

    add(productCart: ShoppingCart) {
         if (this.products.has(productCart)) {
            const productCount = this.products.get(productCart);
            const updatedCount = (Number(productCount) ?? 0) + 1;
            this.products.set(productCart, updatedCount);
        } else {
            this.products.set(productCart, 1);
        }
    }

    getCart() {
        return Array.from(this.products);
    }

    remove(productCart: ShoppingCart) {
        if (this.products.has(productCart)) {
            const productCount = this.products.get(productCart);
            if (productCount === 1) {
                this.products.delete(productCart);
            } else {
                const updatedCount = (productCount as number) - 1;
                this.products.set(productCart, updatedCount);
            }
        }
    }
}