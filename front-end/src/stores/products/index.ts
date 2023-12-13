import { Product } from '@/models/product';
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface ProductsState {
    products: Product[]
}

const getInitialState = (): ProductsState =>  {
    return {products: []};
};

const initialState: ProductsState = getInitialState();

const ProductsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProducts(state, action: PayloadAction<Product[]>) {
      state.products = action.payload;
    },
    addProduct(state, action: PayloadAction<Product>) {
        
    },
    removeProduct(state, action: PayloadAction<Product>) {

    },
    updateProduct(state, action: PayloadAction<Product>) {

    }
   
  }
});

export const {setProducts, addProduct, removeProduct, updateProduct  } = ProductsSlice.actions

export default ProductsSlice.reducer;