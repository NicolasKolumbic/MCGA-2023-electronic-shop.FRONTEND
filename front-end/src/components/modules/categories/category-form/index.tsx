'use client';
import TextBox from "@/components/shared/textbox";
import styles from "./category-form.module.css";
import ProductDetail from "../../product-managment/product-detail";
import { useAppDispatch, useAppSelector } from "@/stores";
import { addCategory, editCategory, getCategoryById } from "@/stores/categories";
import { Category } from "@/models/category";
import Button from "@/components/shared/button";
import { FormEvent, useEffect, useState } from "react";
import { useCreateCategoryMutation, useGetCategoryByIdQuery } from "../category-api";
import { Props } from "./types";

const CategoryForm = ({ id }: Props) => {

    const [category, setCategory] = useState<Category>(new Category());
    const dispatch = useAppDispatch();
    const [createCategory] = useCreateCategoryMutation();
    const storedCategory = useAppSelector(state => state.categories.category);

    const changeDescriptionNameHandler = (value: string) => {
        category!.description = value;
        setCategory(category)
    }

    const updateProductDetailsHandler = (data: any) => {
        category!.features = data;
        setCategory(category)
    }

    const submitHandler = (event: FormEvent) => {
        event.preventDefault();
        if (category?.description && category.features) {
            createCategory({
                description: category.description!,
                characteristics: JSON.stringify(category.features!)
            }).then((res) => {
                console.log(res);
            })
        };
    }
   
    if(id) {
        const {data: editedCategory, isError, error, isLoading}= useGetCategoryByIdQuery(id);

        if(!isLoading) {
            return <>
            <div className="flex-1">
                <form className={styles['categories__form']} onSubmit={submitHandler}>
                    <fieldset>
                        <legend>Editar Categoría</legend>
                        <TextBox
                            type={"text"}
                            id={"categoryName"}
                            label={"Nombre de la Categoria"}
                            design="light"
                            change={(value: string) => changeDescriptionNameHandler(value)}
                            value={editedCategory!.description}
                        />
                        <ProductDetail update={(data: any) => updateProductDetailsHandler(data)} />
                        <div className="flex justify-end">
                            <Button type={"submit"} label={"Guardar Categoria"} design={"prussian"} />
                        </div>
                    </fieldset>
                </form>
            </div>
        </>
        }
    }



    return <>
            <div className="flex-1">
                <form className={styles['categories__form']} onSubmit={submitHandler}>
                    <fieldset>
                        <legend>Editar Categoría</legend>
                        <TextBox
                            type={"text"}
                            id={"categoryName"}
                            label={"Nombre de la Categoria"}
                            design="light"
                            change={(value: string) => changeDescriptionNameHandler(value)}
                            value={category.description}
                        />
                        <ProductDetail update={(data: any) => updateProductDetailsHandler(data)} />
                        <div className="flex justify-end">
                            <Button type={"submit"} label={"Guardar Categoria"} design={"prussian"} />
                        </div>
                    </fieldset>
                </form>
            </div>
        </>

    
};

export default CategoryForm;