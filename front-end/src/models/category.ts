import { CategoryDto } from "@/dtos/category-dto";
import { Feature } from "./feature";

export class Category {
    id?: string;
    description?: string;
    features: Feature[];

    constructor(category?: CategoryDto) {
        this.id = category?._id;
        this.description = category?.description;
        this.features = category?.characteristics ? JSON.parse(category?.characteristics): [];
    }
}