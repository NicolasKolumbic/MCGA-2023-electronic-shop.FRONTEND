'use client'

import Dropdown from "@/components/shared/dropdown";
import TextBox from "@/components/shared/textbox";
import { Category } from "@/models/category";
import { Product } from "@/models/product";
import { useState } from "react";

const AddProduct = () => {

    const [categories, setCategories] = useState([]);
    const [product, setProduct] = useState(new Product());

    const updateCategoryHandler = (id: string) => {
        const _category: Category | undefined = categories.find((category: Category) => category.id === id);
        const newProduct = {...product};
        newProduct.category = _category;
        setProduct(newProduct);
    }

    const productNameHandler= (value: string) => {
        const newProduct = {...product};
        newProduct.name = value;
        setProduct(newProduct);
    }

    const priceHandler= (value: string) => {
        const newProduct = {...product};
        newProduct.price = +value;
        setProduct(newProduct);
    }

    return <>
        <div>
            <TextBox type={"text"} id={"productName"} label={"Nombre de producto"} design="light" change={productNameHandler} />
            <TextBox type={"text"} id={"price"} label={"Precio"} design="light" change={priceHandler} />
            <Dropdown items={categories} id={"categories"} change={updateCategoryHandler}  /> 
        </div>
    </>
};

export default AddProduct;