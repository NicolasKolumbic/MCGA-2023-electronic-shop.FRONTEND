"use client";
import Filters from "@/components/modules/shopping/filters";
import styles from "./shopping.module.css";
import { useGetProductsQuery } from "@/components/modules/product-managment/product-api";
import { useAppDispatch, useAppSelector } from "@/stores";
import { useEffect } from "react";
import { setProducts } from "@/stores/products";
import { Product } from "@/models/product";
import ProductDetailsTabla from "@/components/modules/product-managment/product-details-table";


const Shopping = () => {

    const dispatch = useAppDispatch();
    const {data: storedProducts, isError, error, isLoading } = useGetProductsQuery({});

    const products = useAppSelector(state => state.products.products);

    useEffect(() => {
        if(storedProducts) {
            dispatch(setProducts(storedProducts))
        }
    }, [storedProducts])

    return <>
        <div className={styles["shopping-page"]}>
            <aside>
                <Filters />
            </aside>
            <section>
                <article>
                <div className={styles["scroll-bar"]}>
                <div className="flex flex-wrap gap-6 mt-4 p-3">
                {
                    products.map((product: Product, index: number) => (
                        <div key={product.description+"-"+index} className={styles["product-item"] + " flex justify-between gap-3 p-4"}>
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
                                <figure className={styles["product-image"]}>
                                    <img src={"data:image/jpeg;base64,"+ product.image} />
                                </figure>
                            </div>
                            
                        </div>
                    ))
                }
                </div>
            </div> 
                </article>
            </section>
        </div>
    </>
}

export default Shopping;