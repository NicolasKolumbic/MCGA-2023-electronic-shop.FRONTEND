export interface AddProductDto {
    id?: string;
    description: string;
    price: number;
    stock: number;
    categoryId: string;
    features: string;
    image: string;
}