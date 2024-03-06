'use client';
import { AddSaleDto } from '@/dtos/add-sale-dto';
import { SaleDto } from '@/dtos/sale-dto';
import { Sale } from '@/models/sale';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const saleApi = createApi({
    reducerPath: 'saleApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3005/api/v1' }),
    tagTypes: ['Sales'],
    endpoints: (builder) => ({
      getProducts: builder.query({
        query: () => '/sale',
        providesTags: ['Sales'],
        transformResponse: (sales: SaleDto[]) => {
          return sales.map((saleDto: SaleDto) => new Sale(saleDto))
        }
      }),
      getProductById: builder.query<Sale, string>({
        query: (id: string) => ({ url: `/sale/${id}` }),
        providesTags: ['Sales'],
         transformResponse: (productDto: SaleDto) => {
          return new Sale(productDto)
        }
      }),
      createProduct: builder.mutation<SaleDto, AddSaleDto>({
        query: (body) => ({
          url: '/sale',
          method: 'POST',
          body,
        })
      }),
      updateProduct: builder.mutation<SaleDto, Partial<AddSaleDto>>({
        query: (sale) => ({
          url: `/sale/${sale.id}`,
          method: 'PATCH',
          body: {
            detail: sale.detail,
            price: sale.price
          }
        })
      }),
      removeProduct: builder.mutation<Sale[], Partial<AddSaleDto>>({
        query: (sale) => ({
          url: `/sale/${sale.id}`,
          method: 'DELETE'
        }),
        transformResponse: (products: SaleDto[]) => {
          return products.map((productDto:SaleDto) => new Sale(productDto) )
        }
      })
    })
});

export const { useCreateProductMutation, useGetProductByIdQuery, useGetProductsQuery, useUpdateProductMutation, useRemoveProductMutation } = saleApi;