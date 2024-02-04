'use client'
import { useAppDispatch, useAppSelector } from "@/stores";
import Button from "@/components/shared/button";

import { useGetProductsQuery } from "../../modules/product-managment/product-api";
import { useEffect } from "react";
import { setProducts } from "@/stores/products";
import { Product } from "@/models/product";


const ProductManagment = () =>  {

    const dispatch = useAppDispatch();
    const addProduct = () => {};
    const {data: storedProducts, isError, error, isLoading } = useGetProductsQuery({})

    const products = useAppSelector(state => state.products.products);

    useEffect(() => {
        if(storedProducts) {
            dispatch(setProducts(storedProducts))
        }
    }, [storedProducts])

    return <>
        <h2>Productos</h2>
        <hr/>
        <div>
            <div>
                <Button type={"button"} label={"Nuevo Producto"} design={"prussian"} click={addProduct} />
            </div>
            {
                products.map((product: Product) => (
                    <div key={product.description}>
                        {JSON.stringify(product)}
                    </div>
                ))
            }
        </div>
    </>
};

export default ProductManagment;