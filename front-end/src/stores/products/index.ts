import { Product } from '@/models/product';
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface ProductsState {
    products: Product[];
    product?: Product;
}

const getInitialState = (): ProductsState =>  {
    return {
      products: [],
      product: undefined
    };
};

const initialState: ProductsState = getInitialState();

const ProductsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProducts(state, action: PayloadAction<Product[]>) {
      state.products = action.payload;
    },
    setProduct(state, action: PayloadAction<Product>) {
        state.product = action.payload;
    },
    removeProduct(state, action: PayloadAction<Product>) {

    },
    updateProduct(state, action: PayloadAction<Product>) {
      state.product = action.payload;
    }
   
  }
});

export const {setProducts, setProduct, removeProduct, updateProduct  } = ProductsSlice.actions

export default ProductsSlice.reducer;