import { DetailDto } from "./detail-dto";

export interface SaleDto {
    _id: string;
    detail: DetailDto[];
    price: number;
}