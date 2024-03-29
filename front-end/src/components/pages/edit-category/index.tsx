'use client'
import CategoryForm from "@/components/modules/categories/category-form";
import { useParams  } from 'next/navigation'

const EditCategory = () => {

    const params = useParams()
    const id = params['id'].toString() || ''
    
    return <>
            <CategoryForm id={id} />
    </>
}

export default EditCategory;