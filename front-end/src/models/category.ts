import { CategoryDto } from "@/dtos/category-dto";
import { Features } from "./features";

export class Category {
    id?: string;
    description?: string;
    features?: Features[];

    constructor(category?: CategoryDto) {
        this.id = category?._id;
        this.description = category?.description;
        this.features = category?.characteristics;
    }
}