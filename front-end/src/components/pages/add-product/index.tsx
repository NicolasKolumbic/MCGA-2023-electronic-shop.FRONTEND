"use client";
import ProductForm from "@/components/modules/product-managment/product-form";
import { useParams  } from 'next/navigation'

const AddProduct = () =>  {

    const params = useParams()
    const id = params['id'] ? params['id'].toString() : ''

    return <>
        <div>
            <ProductForm id={id} />
        </div>
    </>
};

export default AddProduct;