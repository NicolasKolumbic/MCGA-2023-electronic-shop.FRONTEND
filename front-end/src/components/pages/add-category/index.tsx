"use client";
import CategoryForm from '@/components/modules/categories/category-form';
import { useParams  } from 'next/navigation'

const AddCategory = () =>  {

    const params = useParams()
    const id = params['id'] ? params['id'].toString() : ''

    return <>
        <div>
            <CategoryForm id={id} />
        </div>
    </>
};

export default AddCategory;