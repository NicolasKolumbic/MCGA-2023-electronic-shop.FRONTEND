"use client";
import Button from "@/components/shared/button";
import TextBox from "@/components/shared/textbox";
import { FaPlus, FaMinus } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { useEffect, useState } from "react";
import { Props } from "./types";
import { CategoryFeature } from "@/models/category-feature";
import { CategoryFeatureDetail } from "@/models/category-feature-detail";

import styles from "./product-detail.module.css";
import { Feature } from "@/models/feature";

const ProductDetail = ({ update, features }: Props) => {

    let defaultFeatures: CategoryFeature[] = [new CategoryFeature({ id: 'feature-name-1' })];

    const [items, setItems]: [CategoryFeature[], (item: CategoryFeature[]) => void] = useState(defaultFeatures);

    const validate = (categoryFeatures: CategoryFeature[]) => {
        const rows = categoryFeatures.map((categoryFeature: CategoryFeature) => {
            const nameIsValid = !!(categoryFeature.name) && categoryFeature.name.length > 3;
            const valuesAreValid = categoryFeature.values.some((categoryDetail: CategoryFeatureDetail) => categoryDetail.value !== '');
            categoryFeature.isValid = nameIsValid && valuesAreValid;
            return categoryFeature;
        });

        setItems([...rows])
    }

    useEffect(() => {
        if (features && features.length > 0) {
            const rowsFeatures: CategoryFeature[] = [];
            features.forEach((feature: Feature, index: number) => {
                rowsFeatures.push(new CategoryFeature({ 
                    id: 'feature-name-'+index,
                    name: feature.description,
                    values: feature.values.map((value: string, subIndex: number) => new CategoryFeatureDetail({
                        key: 'feature-value-detail-'+ subIndex,
                        value: value
                    }))
                }));
            });
            setItems([...rowsFeatures]);
        }
    }, [features])

    const clickAddHandler = (index: number) => {
        const updated = [
            ...items,
            new CategoryFeature({
                id: 'feature-name-' + (items.length + 1)
            })
        ]
        validate(updated);
    };

    const clickLessHandler = (index: number) => {
        let rows = items;
        if (rows.length > 1) {
            rows = rows.filter((item: CategoryFeature, index: number) => index < (rows.length - 1));
            validate(rows);
            emit(rows);
        }
    };

    const clickAddValueHandler = (featureName: string, subIndex: number) => {
        const rows = items;
        const categoryFeature = rows.find((categoryFeature: CategoryFeature) => categoryFeature.id === featureName)!;
        if(categoryFeature) {
            const newIndex = subIndex + 2;
            categoryFeature.values.push(new CategoryFeatureDetail({key:'feature-value-detail-'+ newIndex, value:''}))
        }

    validate(rows);
    }

    const valueChangeHandler = (featureName: string, optionName: string, value: string) => {
        const categoryFeature = items.find((categoryFeature: CategoryFeature) => categoryFeature.id === featureName)!;
        const categoryFeatureDetail = categoryFeature.values.find((featureDetail: CategoryFeatureDetail) => featureDetail.key === optionName);

        if (categoryFeatureDetail) {
            categoryFeatureDetail.value = value;
        } else {
            categoryFeature.values.push(new CategoryFeatureDetail({
                key: optionName,
                value
            }));
        }

        const features = [...items];

        validate(features);
        emit(features);
    }

    const keyChangeHandler = (featureId: string, value: string) => {
        const categoryFeature = items.find((row: CategoryFeature) => row.id === featureId);
        const features = items;
        if (categoryFeature) {
            categoryFeature.name = value;
        } else {
            features.push(new CategoryFeature({ name: value }));
        }
        validate(features);
        emit(features);
    }

    const removeCategoryFeatureDetail = (featureId: string, featureDetailId: string) => {
        const features = items.map((categoryFeature: CategoryFeature) => {
            if(categoryFeature.id === featureId) {
                categoryFeature.values = categoryFeature.values
                                                        .filter((categoryFeatureDetail: CategoryFeatureDetail) => categoryFeatureDetail.key !== featureDetailId)
            }
            return categoryFeature;
        });
        validate(features);
        emit(features);
    }

    const emit = (items: CategoryFeature[]) => {
        if (update) {
            update(
                items
                    .filter((row: CategoryFeature) => row.isValid)
                    .map((row: CategoryFeature) => new Feature(row))
            );
        }
    }

    return <>
        <div className="mt-4">
            {
                items.map((feature: CategoryFeature, index: number) => (
                    <div className="p-3 border-t-slate-500 border-t border-t-solid" key={index}>
                        <table>
                            <thead>
                                <tr>
                                    <th>
                                        <div className={`${styles['textbox-container']} mt-4 mb-4`}>
                                            <TextBox type={"text"}
                                                id={feature.id}
                                                label={"Nombre de característica de la categoría"}
                                                design="light"
                                                change={(value: string) => keyChangeHandler(feature.id, value)}
                                                value={feature.name} />
                                        </div>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr >
                                    <td className="pr-2">
                                        <h4 className={styles['product-details-title']}>Opciones de las características</h4>
                                        <div className="inline-flex items-center flex-wrap mt-3">
                                            {
                                                feature.values.map((featureDetail: CategoryFeatureDetail, subIndex: number) => (

                                                    <div key={featureDetail.key}  className="flex items-center">
                                                        <TextBox type={"text"}
                                                            id={featureDetail.key}
                                                            design="light"
                                                            change={(value: string) => valueChangeHandler(
                                                                feature.id,
                                                                featureDetail.key,
                                                                value
                                                            )}
                                                            value={featureDetail.value} />
                                                            <Button type={"button"} label={<IoClose />} design={"transparent-prussian"} click={(event: React.MouseEvent) => removeCategoryFeatureDetail(feature.id, featureDetail.key)} />
                                                            {
                                                        (feature.values.length === subIndex + 1)
                                                        ?
                                                        <div>
                                                            <Button type={"button"} label={<FaPlus />} design={"transparent-prussian"} click={(event: React.MouseEvent) => clickAddValueHandler(feature.id, subIndex)} />
                                                            <Button type={"button"} label={<FaMinus />} design={"transparent-prussian"} click={(event: React.MouseEvent) => removeCategoryFeatureDetail(feature.id, featureDetail.key)} />
                                                        </div>
                                                        :
                                                        null
                                                    }
                                                    </div>                                   
                                                ))
                                            }
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <div className="flex gap-2">
                                            {
                                                (items.length === index + 1)
                                                    ?
                                                    <>
                                                        <Button type={"button"} label={<FaPlus />} design={"prussian"} click={(event: React.MouseEvent) => clickAddHandler(index)} />
                                                        <Button type={"button"} label={<FaMinus />} design={"prussian"} click={(event: React.MouseEvent) => clickLessHandler(index)} />
                                                    </>
                                                    :
                                                    null
                                            }
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                ))
            }

        </div>
    </>
}

export default ProductDetail;