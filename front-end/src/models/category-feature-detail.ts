export class CategoryFeatureDetail {
    key: string;
    value: string;

    constructor({key,value}:CategoryFeatureDetail) {
        this.key = key ?? '';
        this.value = value ?? '';
    }
}