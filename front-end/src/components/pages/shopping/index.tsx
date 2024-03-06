'use client'
import { useAppDispatch, useAppSelector } from "@/stores";
import styles from "./shopping.module.css";
import { useGetProductsQuery } from "@/components/modules/product-managment/product-api";
import { useEffect, useState } from "react";
import { setProducts } from "@/stores/products";
import { Product } from "@/models/product";
import Button from "@/components/shared/button";
import ProductDetailsTabla from "@/components/modules/product-managment/product-details-table";
import CartDetail from "@/components/modules/shopping/cart";
import { RiDeleteBin5Line } from "react-icons/ri";
import Dropdown from "@/components/shared/dropdown";
import { useGetCategoriesQuery } from "@/components/modules/categories/category-api";
import { DropdownItem } from "@/models/dropdown-item";
import { Category } from "@/models/category";
import { ShoppingCart } from "@/models/shopping-cart";
import { ShoppingCartForSale } from "@/models/shopping-cart copy";


const Shopping = () => {

    const dispatch = useAppDispatch();
    const { data: storedProducts } = useGetProductsQuery({})
    const {data: categories, isError, error, isLoading} = useGetCategoriesQuery({});

    const filteredProducts = useAppSelector(state => state.products.products).filter((product: Product) => product.stock > 0);

    const [productsCart, SetProductCart] = useState<ShoppingCart[]>([]);
    //const shoppingCart = new ShoppingCartForSale();

    useEffect(() => {
        if (storedProducts) {
            dispatch(setProducts(storedProducts))
        }
    }, [storedProducts]);

    const addProductCartHandler = (product: Product) => {
        const updatedProducts = filteredProducts.map((p) =>
            p.id === product.id ? { ...p, stock: p.stock - 1 } : p
        );
        dispatch(setProducts(updatedProducts));
        const detailDto: ShoppingCart = {
            id: product.id,
            description: product.description,
            quantity: 1,
            price: product.price,
        };
        //shoppingCart.add(detailDto);
        //console.log(shoppingCart.getCart());
        SetProductCart([...productsCart, detailDto]);
    };

    const removeProductHandler = (product: ShoppingCart) => {
        const updatedProducts = filteredProducts.map((p) =>
            p.id === product.id ? { ...p, stock: p.stock + 1 } : p
        );
        dispatch(setProducts(updatedProducts));
        const indexToRemove = productsCart.findIndex((p) => p.id === product.id);
        if (indexToRemove !== -1) {
            const updatedCart = [...productsCart];
            updatedCart.splice(indexToRemove, 1);
            SetProductCart(updatedCart);
        }
    };

    const updateCategoryChangeHandler = (value: string) => {
        const updatedProducts = (storedProducts ?? []).filter((product: Product) => product.category.id === value && product.stock > 0);
        dispatch(setProducts(updatedProducts));
    };



    const template = (title: string, label: string, categories: DropdownItem[]) => {
    return <>
        <h2>Shopping</h2>
        <div>
        <div>
                                <Dropdown
                                    items={categories}
                                    id={"categories"}
                                    label="Categorías"
                                    change={(value: string) => updateCategoryChangeHandler(value)}
                                    />
                            </div>
            <div className={styles["scroll-bar"]}>
                <div className="flex flex-wrap gap-6 mt-4 p-3">
                    {
                        filteredProducts.map((product: Product,index:number) => (
                            <div key={product.description+"-"+index} className={styles["product-item"] + " flex flex-col justify-between gap-3 p-4"}>
                                <div className=" flex flex-row gap-3 p-4">
                                    <div className="flex flex-col justify-between">
                                        <div>
                                            <h3 className={styles["product-title"]}>{product.description}</h3>
                                            <p><span className={styles["product-pill"]}>{product.category.description}</span></p>
                                            <ProductDetailsTabla features={product.features} />
                                        </div>
                                        <div>
                                            <span>Stock</span>
                                            <p className={styles["product-price"]}>{product.stock} </p>
                                            <span>Precio</span>
                                            <p className={styles["product-price"]}>{product.price}</p>
                                        </div>
                                    </div>
                                    <div>
                                        <figure className={styles["product-image"]}>
                                            <img src={"data:image/jpeg;base64," + product.image} />
                                        </figure>
                                    </div>
                                </div>
                                <div className=" flex justify-center">
                                    <Button click={() => addProductCartHandler(product)} label={"Agregar producto"} design={"cerulean"} />
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
            <div>
                <h2>carrito</h2>
                {productsCart.map((cart:ShoppingCart,index:number) => (
                    <div key={cart.id+"-"+index} className=" flex ">
                        <ul>
                            <CartDetail {...cart} />
                        </ul>
                        <Button label={""}
                            icon={<RiDeleteBin5Line size={20} />}
                            design={"transparent-prussian"}
                            click={() => removeProductHandler(cart)} />
                    </div>
                ))
                }
            </div>
        </div>
    </>
        } 



        if(categories && categories.length > 0) {
            const items: DropdownItem[] = categories.map((category: Category) => {return {key: category.description, value: category.id}}) as DropdownItem[];
                    return template("Editar Producto", "Actualizar Producto",items)
        }
};

export default Shopping;