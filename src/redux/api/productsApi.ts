import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { constants } from '../../utils/constants';
import { Product } from '../types';

export const productsApi = createApi({
  reducerPath: 'productsApi',
  baseQuery: fetchBaseQuery({ baseUrl: constants.BASE_URL }),
  endpoints: builder => ({
    getProducts: builder.query<Array<Product>, void>({
      query: () => '/products',
    }),
    getProductById: builder.query<Product, number>({
      query: id => `/products/${id}`,
    }),
  }),
});

export const { useGetProductsQuery, useGetProductByIdQuery } = productsApi;
