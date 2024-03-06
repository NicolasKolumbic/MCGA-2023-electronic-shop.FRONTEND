import { DetailDto } from '@/dtos/detail-dto';
export class ShoppingCart {
    id: string;
    description: string;
    quantity: number;
    price: number;

    constructor(detailDto?: DetailDto) {
        this.id = detailDto?._id ?? '';
        this.description = detailDto?.description ?? '';
        this.quantity = detailDto?.quantity ?? 0;
        this.price = detailDto?.price ?? 0;
    }
}