import styles from "./category.module.css";
import CategoriesList from "@/components/pages/categories-list/categories-list";
import CategoryForm from "@/components/modules/categories/category-form";

const CategoryManagmentPage = () => {

    return <>
        <div className="flex">
            <div className={styles['categories__list']}>
                <h4 className={styles["categories__title"]}>Todas las Categorias</h4>
                <CategoriesList />             
            </div>
            <CategoryForm />
        </div>
    </>
};

export default CategoryManagmentPage;