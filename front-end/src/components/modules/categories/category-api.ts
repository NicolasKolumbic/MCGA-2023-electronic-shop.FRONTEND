'use client';
import { CategoryDto } from '@/dtos/category-dto';
import { CategoryRequestDto } from '@/dtos/category-request-dto';
import { CategoryUpdateRequestDto } from '@/dtos/category-update-request-dto';
import { Category } from '@/models/category';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const categoryApi = createApi({
    reducerPath: 'categoryApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3005/api/v1' }),
    tagTypes: ['Categories'],
    endpoints: (builder) => ({
      getCategories: builder.query({
        query: () => '/category',
        providesTags: ['Categories'],
        transformResponse: (categoriesDto: CategoryDto[]) => {
          return categoriesDto.map((categoryDto: CategoryDto) => new Category(categoryDto))
        },
      }),
      getCategoryById: builder.query<Category, string>({
        query: (id: string) => ({ url: `/category/${id}` }),       
        providesTags: ['Categories'],
        transformResponse: (categoryDto: CategoryDto) => {
          return new Category(categoryDto)
        }
      }),
      createCategory: builder.mutation<Category, CategoryRequestDto>({
        query: (body) => ({
          url: '/category',
          method: 'POST',
          body,
        })
      }),
      updateCategory: builder.mutation<Category, Partial<CategoryUpdateRequestDto>>({
        query: (category) => ({
          url: `/category/${category.id}`,
          method: 'PATCH',
          body: {
            description: category.description,
            characteristics: category.characteristics
          }
        })
      })
    })
});

export const { useGetCategoriesQuery, useCreateCategoryMutation, useGetCategoryByIdQuery, useUpdateCategoryMutation } = categoryApi;