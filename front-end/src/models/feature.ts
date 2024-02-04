import { CategoryFeature } from "./category-feature";
import { CategoryFeatureDetail } from "./category-feature-detail";

export class Feature {
    description: string;
    values: string[];

    constructor(categoryFeature: CategoryFeature) {
        this.description = categoryFeature.name;
        this.values = categoryFeature.values.map((categoryFeatureDetail: CategoryFeatureDetail) => categoryFeatureDetail.value);
    }
}