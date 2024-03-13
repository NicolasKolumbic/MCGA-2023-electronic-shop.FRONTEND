import { ShoppingCart } from "@/models/shopping-cart";

export class ShoppingCartForSale {
    products:ShoppingCart[] = [];

    add(productCart: ShoppingCart) {
        const index = this.products.findIndex((prod) => prod.id === productCart.id);
         if (index !== -1) {
            this.products[index].quantity += 1;
        } else {
            this.products.push(productCart);
        }
    }

    getCart() {
        return this.products;
    }

    remove(productCart: ShoppingCart) {
        const index = this.products.findIndex((prod) => prod.id === productCart.id);
        if (index !== -1) {
            if (this.products[index].quantity === 1) {
                this.products.splice(index, 1);
            } else {
                this.products[index].quantity -= 1;
            }
        }
    }
}