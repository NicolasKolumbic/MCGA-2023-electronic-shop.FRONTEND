import EditCategory from "@/components/pages/edit-category";
import { Metadata } from "next";

export const metadata: Metadata = {
        title: 'Iniciar Sesión - Digital World - Electronic Shop',
        description: 'Somos una tienda online de productos electrónicos',
    }

const CategoryPage = () => {

    return <>
        <div>
            <EditCategory />
        </div>
    </>
};

export default CategoryPage;