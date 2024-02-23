'use client'
import { useAppDispatch, useAppSelector } from "@/stores";
import Button from "@/components/shared/button";
import { RiDeleteBin5Line, RiEdit2Line } from "react-icons/ri";

import { useGetProductsQuery, useRemoveProductMutation } from "../../modules/product-managment/product-api";
import { useEffect, MouseEvent } from "react";
import { setProducts } from "@/stores/products";
import { Product } from "@/models/product";

import styles from './product-managment.module.css'
import ProductDetailsTabla from "@/components/modules/product-managment/product-details-table";
import { QueryReturnValue } from "@reduxjs/toolkit/dist/query/baseQueryTypes";
import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";


const ProductManagment = () =>  {

    const dispatch = useAppDispatch();
    const {data: storedProducts, isError, error, isLoading } = useGetProductsQuery({})
    const [removeProduct] = useRemoveProductMutation();

    const products = useAppSelector(state => state.products.products);

    useEffect(() => {
        if(storedProducts) {
            dispatch(setProducts(storedProducts))
        }
    }, [storedProducts])

    const removeProductHandler = (product: Product) => {
        removeProduct({
            id: product.id,
            description: product.description,
            price: product.price,
            image: product.image,
            stock: product.stock,
            features: JSON.stringify(product.features),
            categoryId: product.category.id!
        }).then((response: QueryReturnValue<Product[], FetchBaseQueryError | SerializedError>) => {
            if(response.data) {
                dispatch(setProducts(response.data))
            } 
        });
    };

    return <>
        <h2>Productos</h2>
        <hr/>
        <div>
            <div className="pb-6">
                <Button  label={"Nuevo Producto"} design={"prussian"} link="/add-product" />
            </div>
            <div className={styles["scroll-bar"]}>
                <div className="flex flex-wrap gap-6 mt-4 p-3">
                {
                    products.map((product: Product) => (
                        <div key={product.description} className={styles["product-item"] + " flex gap-3 p-4"}>
                            <div className="flex flex-col justify-between">
                                <div>
                                    <h3 className={styles["product-title"]}>{product.description}</h3>
                                    <p><span className={styles["product-pill"]}>{product.category.description}</span></p>
                                    <ProductDetailsTabla features={product.features} />
                                </div>
                                <div>
                                    <span>Stock</span>
                                    <p className={styles["product-price"]}>{product.stock}</p>
                                    <span>Precio</span>
                                    <p className={styles["product-price"]}>{product.price}</p>
                                </div>
                            </div>
                            <div>
                                <div className="flex justify-end">
                                    <Button label={"Editar"} 
                                            icon={<RiEdit2Line size={20}/>}
                                            link={`product-managment/${product.id}`}
                                            design={"transparent-prussian"}
                                            />
                                    <Button label={"Eliminar"} 
                                            icon={<RiDeleteBin5Line size={20} />}
                                            design={"transparent-prussian"}
                                            click={(event: MouseEvent) => removeProductHandler(product)} />
                                </div>
                                <figure className={styles["product-image"]}>
                                    <img src={"data:image/jpeg;base64,"+ product.image} />
                                </figure>
                            </div>
                            
                        </div>
                    ))
                }
                </div>
            </div>        
        </div>
    </>
};

export default ProductManagment;