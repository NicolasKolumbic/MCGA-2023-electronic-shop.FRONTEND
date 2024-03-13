export interface saleRequestDto {
    _id: string;
    saleId: number;
    detail: [{productId: string, quantity: number, price: number}];
    total: number;
}