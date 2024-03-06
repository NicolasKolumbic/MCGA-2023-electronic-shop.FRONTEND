import { SaleDto } from "@/dtos/sale-dto";
import { ShoppingCart } from "./shopping-cart";
export class Sale {
    id: string;
    detail: ShoppingCart[];
    price: number;

    constructor(saleDto?: SaleDto) {
        this.id = saleDto?._id ?? '';
        this.detail = saleDto?.detail.map(detail => new ShoppingCart(detail)) ?? [];
        this.price = saleDto?.price ?? 0;
    }
}