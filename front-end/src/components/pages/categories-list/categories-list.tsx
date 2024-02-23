'use client';
import { useAppDispatch, useAppSelector } from "@/stores";
import { useRouter } from 'next/navigation'
import { Category } from "@/models/category";
import styles from './categories-list.module.css';
import Button from "@/components/shared/button";
import { MouseEvent, useEffect } from "react";
import { AiTwotoneDelete, AiOutlineEdit  } from "react-icons/ai"
import { useRemoveCategoryMutation, useGetCategoriesQuery } from "@/components/modules/categories/category-api";
import { setCategories } from "@/stores/categories";
import { QueryReturnValue } from "@reduxjs/toolkit/dist/query/baseQueryTypes";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { SerializedError } from "@reduxjs/toolkit";

const CategoriesList = () => {

    const dispatch = useAppDispatch();
    const [removeCategory] = useRemoveCategoryMutation();
    const {data: storedCategories, isError, isLoading, isSuccess} = useGetCategoriesQuery({});
    const categories = useAppSelector(state => state.categories.categories);
    const router = useRouter();

    const removeCategoryHandler = (categoryId: string) => {
        removeCategory(categoryId).then((response: QueryReturnValue<Category[], FetchBaseQueryError | SerializedError>) => {
            if(response.data) {
                dispatch(setCategories(response.data))
            }  
        })
    }

    useEffect(() => {
        if(storedCategories && categories.length === 0) {
            dispatch(setCategories(storedCategories))
        }

    }, [storedCategories])

    if (categories && categories.length > 0) {

        return <>
            <ul className={styles["categories-list"]}>
                {
                    categories.map((category: Category) =>
                        <li className={styles["categories-list__item"]} key={category.description}>
                            <div className="inline-flex gap-2 items-center">
                                {category.description}  
                                <Button label={""}
                                    icon={<AiOutlineEdit  size={20}/>}
                                    design={"transparent-prussian"}
                                    link={`/category/${category.id}`} />  
                                <Button label={""}
                                    icon={<AiTwotoneDelete size={20}/>}
                                    design={"transparent-prussian"}
                                    click={(event: MouseEvent) => removeCategoryHandler(category.id!)} />
                            </div>
                        </li>
                    )
                }
            </ul>
        </>
    }
};


export default CategoriesList