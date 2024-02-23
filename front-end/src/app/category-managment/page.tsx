import styles from "./category.module.css";
import CategoriesList from "@/components/pages/categories-list/categories-list";
import Button from "@/components/shared/button";

const CategoryManagmentPage = () => {

    return <>
        <div className="flex">
            <div className={styles['categories__list']}>
                <div className="flex align-middle justify-between">
                    <h4 className={styles["categories__title"]}>Todas las Categorias</h4>
                    <Button label={"Nueva Categoría"} design={"prussian"} link="/add-category" />
                </div>          
                <CategoriesList />             
            </div>

        </div>
    </>
};

export default CategoryManagmentPage;