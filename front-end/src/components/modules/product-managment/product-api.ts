'use client';
import { baseQueryCallback } from '@/core/base-query';
import { AddProductDto } from '@/dtos/add-product-dto';
import { ProductDto } from '@/dtos/product-dto';
import { Product } from '@/models/product';
import { createApi } from '@reduxjs/toolkit/query/react';

export const productApi = createApi({
    reducerPath: 'productApi',
    baseQuery: baseQueryCallback,
    tagTypes: ['Products'],
    endpoints: (builder) => ({
      getProducts: builder.query({
        query: () => '/product',
        providesTags: ['Products'],
        transformResponse: (products: ProductDto[]) => {
          return products.map((productDto: ProductDto) => new Product(productDto))
        }
      }),
      getProductById: builder.query<Product, string>({
        query: (id: string) => ({ url: `/product/${id}` }),       
        providesTags: ['Products'],
        transformResponse: (productDto: ProductDto) => {
          return new Product(productDto)
        }
      }),
      createProduct: builder.mutation<ProductDto, AddProductDto>({
        query: (body) => ({
          url: '/product',
          method: 'POST',
          body,
        })
      }),
      updateProduct: builder.mutation<ProductDto, Partial<AddProductDto>>({
        query: (product) => ({
          url: `/product/${product.id}`,
          method: 'PATCH',
          body: {
            description: product.description,
            price: product.price,
            image: product.image,
            stock: product.stock,
            features: product.features,
            categoryId: product.categoryId!
          }
        })
      }),
      removeProduct: builder.mutation<Product[], Partial<AddProductDto>>({
        query: (product) => ({
          url: `/product/${product.id}`,
          method: 'DELETE'
        }),
        transformResponse: (products: ProductDto[]) => {
          return products.map((productDto:ProductDto) => new Product(productDto) )
        }
      })
    })
});

export const { useCreateProductMutation, useGetProductByIdQuery, useGetProductsQuery, useUpdateProductMutation, useRemoveProductMutation } = productApi;