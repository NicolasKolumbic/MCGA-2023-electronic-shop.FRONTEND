import { CategoryFeatureDetail } from "./category-feature-detail";

export class CategoryFeature {
    id: string;
    name: string;
    isValid: boolean;
    values: CategoryFeatureDetail[];

    constructor(categoryFeature?: Partial<CategoryFeature>) {
        this.id = categoryFeature && categoryFeature.id ? categoryFeature.id : '';
        this.name = categoryFeature && categoryFeature.name ? categoryFeature.name : '';
        this.isValid = categoryFeature && categoryFeature.isValid ? categoryFeature.isValid : false;
        this.values = categoryFeature && categoryFeature.values ? categoryFeature.values : [new CategoryFeatureDetail({key: 'feature-value-detail-1', value:''})];
    }
}