import { Features } from "@/models/features";

export interface CategoryDto {
    _id: string;
    description: string;
    characteristics: Features[];
}