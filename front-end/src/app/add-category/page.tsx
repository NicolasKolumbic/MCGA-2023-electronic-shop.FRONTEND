import AddCategory from "@/components/pages/add-category";
import { Metadata } from "next";

export const metadata: Metadata = {
        title: 'Agregar Nueva Categoría Digital World - Electronic Shop',
        description: 'Somos una tienda online de productos electrónicos',
    }

const AddCategoryPage = () => {

    return <>
        <div>
            <AddCategory />
        </div>
    </>
};

export default AddCategoryPage;