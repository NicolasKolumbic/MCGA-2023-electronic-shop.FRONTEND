'use client'
import { useAppDispatch, useAppSelector } from "@/stores";
import {setProduct, updateProduct } from "@/stores/products";
import { useCreateProductMutation,useGetProductByIdQuery, useUpdateProductMutation } from "../product-api";
import { useGetCategoriesQuery } from "../../categories/category-api";
import TextBox from "@/components/shared/textbox";
import Dropdown from "@/components/shared/dropdown";
import { Props } from "./types";
import { FormEvent, useEffect } from "react";

import styles from "./product-form.module.css";
import Button from "@/components/shared/button";
import { Category } from "@/models/category";
import { DropdownItem } from "@/models/dropdown-item";
import { Product } from "@/models/product";
import ProductFeature from "../product-features";
import {setCategories } from "@/stores/categories";
import UploadImage from "@/components/shared/upload-image";

const ProductForm = ({id}: Props) => {

    const dispatch = useAppDispatch();
    const [createProductApi] = useCreateProductMutation();
    const [updateProductApi] = useUpdateProductMutation();
    
    const product = useAppSelector(state => state.products.product);
    const storedCategories = useAppSelector(state => state.categories.categories);

    const {data: categories, isError, error, isLoading} = useGetCategoriesQuery({});
    const editedProduct = id ? useGetProductByIdQuery(id) : undefined;

    const submitHandler = (event: FormEvent) => {
        event.preventDefault();
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
                    console.log(res);
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
                    console.log(res);
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
            dispatch(setProduct(result.data))
        }
        
    }
   
    useEffect(() => {

        if(id && editedProduct && !product) {
            loadEditProduct(editedProduct);         
        } else if(!id && !product) {
            dispatch(setProduct(new Product()))
        }

        if(categories && !storedCategories) {
            dispatch(setCategories(categories))
        }
    }, [categories, product, editedProduct])


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
                                    change={(value: string) => updateProductChangeHandler({description: value})} />
                            </div>
                            <div>
                                <TextBox 
                                    type={"text"}
                                    id={"price"}
                                    label={"Precio"}
                                    design="light"
                                    value={product?.price}
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
                                <TextBox 
                                    type={"text"}
                                    id={"stock"}
                                    label={"Stock"}
                                    design="light"
                                    value={product?.stock}
                                    change={(value: string) => updateProductChangeHandler({stock: parseFloat(value)})} />
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
                            <Button type={"button"} label={"Cancelar"} design={"outline-prussian"} click={() => window.location.href= 'http://localhost:3000/product-managment' } />
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
           // 
            return template("Editar Producto", "Actualizar Producto",items)
    } else {
        return template("Nueva Producto", "Guardar Producto", items);
    }
}


};

export default ProductForm;