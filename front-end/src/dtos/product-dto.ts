import { CategoryDto } from "./category-dto";

export interface ProductDto {
    _id: string;
    description: string;
    price: number;
    stock: number;
    category: CategoryDto;
    features: string;
    image: string;
}