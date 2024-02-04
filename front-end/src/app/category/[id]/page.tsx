import CategoriesList from "@/components/pages/categories-list/categories-list";
import styles from "../category.module.css";
import EditCategory from "@/components/pages/edit-category";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: 'Iniciar Sesión - Digital World - Electronic Shop',
    description: 'Somos una tienda online de productos electrónicos',
  }

const CategoryPage = () => {

    return <>
        <div className="flex">
            <div className={styles['categories__list']}>
                <h4 className={styles["categories__title"]}>Todas las Categorias</h4>
                <CategoriesList />             
            </div>
           <EditCategory />
        </div>
    </>
};

export default CategoryPage;