'use client'
import { useAppDispatch, useAppSelector } from "@/stores";
import { useRouter } from 'next/navigation'
import {setProduct, updateProduct } from "@/stores/products";
import { useCreateProductMutation,useGetProductByIdQuery, useUpdateProductMutation } from "../product-api";
import { useGetCategoriesQuery } from "../../categories/category-api";
import TextBox from "@/components/shared/textbox";
import Dropdown from "@/components/shared/dropdown";
import { Props } from "./types";
import { FormEvent, useEffect, useState } from "react";


import styles from "./product-form.module.css";
import Button from "@/components/shared/button";
import { Category } from "@/models/category";
import { DropdownItem } from "@/models/dropdown-item";
import { Product } from "@/models/product";
import ProductFeature from "../product-features";
import {setCategories } from "@/stores/categories";
import UploadImage from "@/components/shared/upload-image";
import { useForm } from "@/hooks/form";
import { required } from "@/hooks/validators/required";
import { minLength } from "@/hooks/validators/minLength";
import { Form } from "@/hooks/form.interface";
import { InputNumber } from "@/components/shared/input-number";

const ProductForm = ({id}: Props) => {

    const dispatch = useAppDispatch();
    const [createProductApi] = useCreateProductMutation();
    const [updateProductApi] = useUpdateProductMutation();
    const editedProduct = id !== undefined ? useGetProductByIdQuery(id) : undefined;
    
    const product = useAppSelector(state => state.products.product);
    const storedCategories = useAppSelector(state => state.categories.categories);
    const router = useRouter();

    const {data: categories, isError, error, isLoading} = useGetCategoriesQuery({});


    const [form, setForm] = useState<Form>(useForm({
        name: 'product-form',
        controls: [
            {
                name: 'description',
                validations: [
                    required(),
                    minLength(5)
                ]
            },
            {
                name: 'price',
                validations: [
                    required()
                ]
            },
            {
                name: 'stock',
                validations: [
                    required()
                ]
            },]}));

    const submitHandler = (event: FormEvent) => {
        event.preventDefault();
        const updatedForm = form.validateAll();
        setForm(updatedForm);
        if (product?.description && product.features) {
            if(product.id) {
                updateProductApi({
                    id: product.id,
                    description: product.description,
                    price: product.price,
                    image: product.image,
                    stock: product.stock,
                    features: JSON.stringify(product.features),
                    categoryId: product.category.id!
                }).then((res: any) => {
                    router.push("/product-managment")
                });
            } else {
                createProductApi({
                    description: product.description,
                    price: product.price,
                    image: product.image,
                    stock: product.stock,
                    features: JSON.stringify(product.features),
                    categoryId: product.category.id!

                }).then((res: any) => {
                    router.push("/product-managment")
                });
            } 
        };
    }

    const updateProductChangeHandler = (partialProduct: Partial<Product>) => {
        const updatedProduct = {
            ...product,
            ...partialProduct
        }
        dispatch(updateProduct(updatedProduct as Product));
    }

    const updateCategoryChangeHandler = (value: string) => {
        
        const category = storedCategories?.find((category: Category) => category.id === value);

        if(category && category.id !== product?.category.id) {
            const updatedProduct = {
                ...product,
                category,
                features: {}
            }
            dispatch(updateProduct(updatedProduct as Product));
        }
    }

    const updateProductFeature = (key: string, value: string) => {
        const features =  {...product?.features!};
        features[key] = value;
        const updatedProduct = {
            ...product,
            features
        }
        dispatch(updateProduct(updatedProduct as Product));
    };

    const updateFile = (fileBase64: string) => {
        const updatedProduct = {
            ...product,
            image: fileBase64
        }
        dispatch(updateProduct(updatedProduct as Product));
        
    };

    const loadEditProduct = (result: any) => {
        if(result.data) {
            form.patchValue(result.data);
            dispatch(setProduct(result.data))
        }
        
    }

    useEffect(() => {

        if(id && editedProduct && !product) {
            loadEditProduct(editedProduct);         
        } else if(!id && !product) {
            dispatch(setProduct(new Product()))
        }

        if(categories && storedCategories.length === 0) {
            dispatch(setCategories(categories))
        }

    }, [categories, product, editedProduct, form])


    const template = (title: string, label: string, categories: DropdownItem[]) => {
        return <>
            <div className="flex-1">
                <form className={styles['products_form']} onSubmit={submitHandler}>
                    <fieldset>
                        <legend>{title}</legend>
                        <div className={styles['products_grid']}>
                            <div>
                                <TextBox 
                                    type={"text"}
                                    id={"productName"}
                                    label={"Nombre de producto"}
                                    design="light"
                                    value={product?.description}
                                    control={form.control("description")}
                                    change={(value: string) => updateProductChangeHandler({description: value})} />
                                
                            </div>
                            <div>
                                <InputNumber 
                                    id={"price"}
                                    label={"Precio"}
                                    design="light"
                                    value={product?.price}
                                    control={form.control("price")}
                                    change={(value: string) => updateProductChangeHandler({price: parseFloat(value)})} />
                            </div>
                            <div>
                                <Dropdown 
                                    items={categories}
                                    id={"categories"}
                                    label="Categorías"
                                    change={(value: string) => updateCategoryChangeHandler(value)}
                                    value={product?.category.description}  />
                            </div>
                            <div>
                                <InputNumber 
                                    id={"stock"}
                                    label={"Stock"}
                                    design="light"
                                    value={product?.stock}
                                    onlyIntegers={true}
                                    control={form.control("stock")}
                                    change={(value: string) => updateProductChangeHandler({stock: parseInt(value, 10)})} />
                            </div>
                            <div>
                                <ProductFeature
                                    features={product?.features}
                                    category={product?.category}
                                    update={updateProductFeature} />
                            </div>
                            <div>
                                <UploadImage 
                                    id="product-image"
                                    change={(fileBase64: string) => updateFile(fileBase64)} />
                                {product?.image ?
                                    <ul className={styles["image-list"]}>
                                        <li className={styles["image-list__item"]}>
                                            <figure className={styles["image-list__image-container"]}>
                                                <img src={"data:image/jpeg;base64,"+product?.image} className={styles["image-list__image"]} alt={product?.description} />
                                            </figure>
                                            <div>
                                                <Button type={"button"} label={"Eliminar"} design={"transparent-prussian"} click={() => updateFile('')} />
                                            </div>
                                        </li>
                                    </ul>
                                    : null
                                }
                                
                                
                            </div>
                        </div>
                        <div className="flex justify-end gap-2">
                            <Button label={"Cancelar"} design={"outline-prussian"} link="/product-managment" />
                            <Button type={"submit"} label={label} design={"prussian"} />
                        </div>
 
                    </fieldset>
                </form>
            </div>
        </>
    } 



if(categories && categories.length > 0) {
    const items: DropdownItem[] = categories.map((category: Category) => {return {key: category.description, value: category.id}}) as DropdownItem[];
    if(id) {
            return template("Editar Producto", "Actualizar Producto",items)
    } else {
        return template("Nueva Producto", "Guardar Producto", items);
    }
}


};

export default ProductForm;