import { Category } from "@/models/category";

export interface Props {
    category?: Category
    features?: {[key: string]: string | number}
    update: (key: string, value: string) => void
}