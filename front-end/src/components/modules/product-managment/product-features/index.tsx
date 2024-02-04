import { Props } from "./types"
import RadioButton from "@/components/shared/radio-button"
import { Feature } from "@/models/feature"

import styles from "./product-feature.module.css";

const ProductFeature = ({category, features, update}: Props) => {

    const updateProductFeature = (description: string, value: string) => {
        if(update) {
            update(description, value);
        }
    }

    const isChecked = (description: string, value: string) => {
       return features && features[description] === value;
    }

    return <>
        {
            category ?
            category.features.map((feature: Feature) => (
                <div key={feature.description}>
                    <h4 className={styles["product-feature__titles"]}>{feature.description}</h4>
                    <div className="flex gap-3">
                    {
                        feature.values.map((value: string) => (
                            <div key={value}>
                                 <RadioButton 
                                    id={feature.description+'-'+value}
                                    name={feature.description}
                                    text={value}
                                    checked={isChecked(feature.description, value)}
                                    change={(value: string) => updateProductFeature(feature.description, value)} />
                            </div>
                        ))
                    }
                    </div>
                   
                </div>
            )): null
        }
    </>
}

export default ProductFeature;