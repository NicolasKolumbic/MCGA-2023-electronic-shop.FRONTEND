import { configureStore } from '@reduxjs/toolkit'
import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';
import categoriesReducer from "./categories";
import productsReducer from "./products";
import { categoryApi } from "../components/modules/categories/category-api";
import { productApi } from "../components/modules/product-managment/product-api";

export const store = configureStore({
  reducer: {
    categories: categoriesReducer,
    [categoryApi.reducerPath]: categoryApi.reducer,
    products: productsReducer,
    [productApi.reducerPath]: productApi.reducer
  },
  middleware: (defaultMiddleware) => defaultMiddleware({serializableCheck: false}).concat(
    categoryApi.middleware,
    productApi.middleware
  )
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;