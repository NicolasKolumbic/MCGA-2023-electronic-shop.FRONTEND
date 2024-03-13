import { DetailDto } from "./detail-dto";

export interface AddSaleDto {
    id: string;
    detail: DetailDto[];
    price: number;
}