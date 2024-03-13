import AddProduct from "@/components/pages/add-product";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: 'Agregar Nuevo Producto Digital World - Electronic Shop',
    description: 'Somos una tienda online de productos electrónicos',
}

const AddProductPage = () => {

    return <>
        <div>
            <AddProduct />
        </div>
    </>
};

export default AddProductPage;