'use client';
import TextBox from "@/components/shared/textbox";
import { useRouter } from 'next/navigation'
import styles from "./category-form.module.css";
import ProductDetail from "../../product-managment/product-detail";
import { useAppDispatch, useAppSelector } from "@/stores";
import {updateCategory } from "@/stores/categories";
import Button from "@/components/shared/button";
import { FormEvent, useEffect, useState} from "react";
import { useCreateCategoryMutation, useGetCategoryByIdQuery, useUpdateCategoryMutation } from "../category-api";
import { Props } from "./types";
import { Feature } from "@/models/feature";
import { required } from "@/hooks/validators/required";
import { minLength } from "@/hooks/validators/minLength";
import { Form } from "@/hooks/form.interface";
import { useForm } from "@/hooks/form";
import { Category } from "@/models/category";


const CategoryForm = ({ id }: Props) => {

    const dispatch = useAppDispatch();
    const [createCategoryApi] = useCreateCategoryMutation();
    const [updateCategoryApi] = useUpdateCategoryMutation();
    const category = useAppSelector(state => state.categories.category);
    const router = useRouter();

    const editedCategory = id ? useGetCategoryByIdQuery(id) : undefined;

    const [form, setForm] = useState<Form>(useForm({
        name: 'category-form',
        controls: [
            {
                name: 'description',
                validations: [
                    required(),
                    minLength(5)
                ]
            },
            {
                name: 'features',
                validations: [
                    required()
                ]
            },
        ]}));

    useEffect(() => {
        if(id && editedCategory && editedCategory.data) {
            form.patchValue(editedCategory.data);
            dispatch(updateCategory(editedCategory.data));         
        } else if(!id && !category) {
            dispatch(updateCategory(new Category()))
        }


    }, [editedCategory, category])

    const changeDescriptionNameHandler = (value: string) => {
        if(category) {
            category.description = value;
            dispatch(updateCategory(category))
        }   
    }

    const updateProductDetailsHandler = (features: Feature[]) => {
        if(category) {
            category!.features = features;
            form.control("features")?.setValue(category);
            dispatch(updateCategory(category))
        }    
    }

    const submitHandler = (event: FormEvent) => {
        event.preventDefault();
        const updatedForm = form.validateAll();
        setForm(updatedForm);
        if (category?.description && category.features) {
            if(category.id) {
                updateCategoryApi({
                    id: category.id,
                    description: category.description!,
                    characteristics: JSON.stringify(category.features)
                }).then(() => {
                    router.push("/category-managment");
                });
            } else {
                createCategoryApi({
                    description: category.description!,
                    characteristics: JSON.stringify(category.features!)
                }).then(() => {
                    router.push("/category-managment");
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
                            control={form.control("description")}
                            change={(value: string) => changeDescriptionNameHandler(value)}
                            value={category?.description}
                        />
                        <ProductDetail 
                            update={(features: Feature[]) => updateProductDetailsHandler(features)}
                            features={category?.features} />
                        <div className="flex justify-end gap-2">
                            <Button label={"Cancelar"} design={"outline-prussian"} link="/category-managment" />
                            <Button type={"submit"} label={label} design={"prussian"} />
                        </div>
                    </fieldset>
                </form>
            </div>
        </>
    } 

    if(id) {
        return template("Editar Categoría", "Actualizar Categoría")
    } else {
        return template("Nueva Categoría", "Guardar Categoría");
    }

    
};

export default CategoryForm;