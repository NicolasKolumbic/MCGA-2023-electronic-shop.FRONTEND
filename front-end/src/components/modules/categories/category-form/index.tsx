'use client';
import TextBox from "@/components/shared/textbox";
import styles from "./category-form.module.css";
import ProductDetail from "../../product-managment/product-detail";
import { useAppDispatch, useAppSelector } from "@/stores";
import {updateCategory } from "@/stores/categories";
import Button from "@/components/shared/button";
import { FormEvent} from "react";
import { useCreateCategoryMutation, useGetCategoryByIdQuery, useUpdateCategoryMutation } from "../category-api";
import { Props } from "./types";
import { Feature } from "@/models/feature";


const CategoryForm = ({ id }: Props) => {

    const dispatch = useAppDispatch();
    const [createCategoryApi] = useCreateCategoryMutation();
    const [updateCategoryApi] = useUpdateCategoryMutation();
    const category = useAppSelector(state => state.categories.category);

    const changeDescriptionNameHandler = (value: string) => {
        if(category) {
            category.description = value;
            dispatch(updateCategory(category))
        }   
    }

    const updateProductDetailsHandler = (features: Feature[]) => {
        if(category) {
            category!.features = features;
            dispatch(updateCategory(category))
        }    
    }

    const submitHandler = (event: FormEvent) => {
        event.preventDefault();
        if (category?.description && category.features) {
            if(category.id) {
                updateCategoryApi({
                    id: category.id,
                    description: category.description!,
                    characteristics: JSON.stringify(category.features)
                }).then((res: any) => {
                    console.log(res);
                });
            } else {
                createCategoryApi({
                    description: category.description!,
                    characteristics: JSON.stringify(category.features!)
                }).then((res: any) => {
                    console.log(res);
                });
            } 
        };
    }

    const template = (title: string, label: string) => {
        return <>
            <div className="flex-1">
                <form className={styles['categories__form']} onSubmit={submitHandler}>
                    <fieldset>
                        <legend>{title}</legend>
                        <TextBox
                            type={"text"}
                            id={"categoryName"}
                            label={"Nombre de la Categoria"}
                            design="light"
                            change={(value: string) => changeDescriptionNameHandler(value)}
                            value={category!.description}
                        />
                        <ProductDetail update={(features: Feature[]) => updateProductDetailsHandler(features)} features={category?.features} />
                        <div className="flex justify-end gap-2">
                            <Button type={"button"} label={"Cancelar"} design={"outline-prussian"} click={() => window.location.href= 'http://localhost:3000/category-managment' } />
                            <Button type={"submit"} label={label} design={"prussian"} />
                        </div>
                    </fieldset>
                </form>
            </div>
        </>
    } 

    if(id) {
        const {data: editedCategory, isError, error, isLoading}= useGetCategoryByIdQuery(id);
        if(!isLoading && editedCategory) {
            dispatch(updateCategory(editedCategory))
            return template("Editar Categoría", "Actualizar Categoría")
        }
    } else {
        return template("Nueva Categoría", "Guardar Categoría");
    }

    
};

export default CategoryForm;