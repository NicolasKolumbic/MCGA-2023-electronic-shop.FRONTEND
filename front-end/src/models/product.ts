import { ProductDto } from "@/dtos/product-dto";
import { Category } from "./category";
export class Product {
    id: string;
    description: string;
    price: number;
    stock: number;
    category: Category;
    features: {[key: string]: string | number};
    image: string;

    constructor(productDto?: ProductDto) {
        this.id = productDto?._id ?? '';
        this.description = productDto?.description ?? '';
        this.price = productDto?.price ?? 0;
        this.stock = productDto?.stock ?? 0;
        this.category = new Category(productDto?.category);
        this.features = {};
        this.image = productDto?.image ?? '';

        const items: {[key: string]: string | number} = JSON.parse(productDto?.features ?? '{}');
        
        for (const key in items) {
            if (Object.prototype.hasOwnProperty.call(items, key)) {
                this.features[key] = items[key];  
            }
        }
    }
    
}