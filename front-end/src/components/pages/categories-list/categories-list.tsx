
import { Category } from "@/models/category";
import styles from './categories-list.module.css';
import Link from "next/dist/client/link";
import { CategoryDto } from "@/dtos/category-dto";

const getData  = (async () => {
    const res = await fetch('http://localhost:3005/api/v1/category');
    const categoriesDtos = await res.json();
    const categories: Category[] = categoriesDtos.map((category: CategoryDto) => new Category(category));
    return categories;
});

 const CategoriesList = async () => {

    const categories = await getData();

    if (categories && categories.length > 0) {

        return <>
            <ul className={styles["categories-list"]}>
                {
                    categories.map((category: Category) =>
                        <li className={styles["categories-list__item"]} key={category.description}>
                            <Link href={`/category/${category.id}`}>
                                {category.description}    
                            </Link>
                        </li>
                    )
                }
            </ul>
        </>
    }
};


export default CategoriesList