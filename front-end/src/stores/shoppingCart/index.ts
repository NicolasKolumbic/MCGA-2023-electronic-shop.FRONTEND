import { ShoppingCart } from '@/models/shopping-cart';
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface ShoppingCartState {
    shoppingCart: ShoppingCart | undefined
}

const getInitialState = (): ShoppingCartState =>  {
    return {shoppingCart: undefined};
};

const initialState: ShoppingCartState = getInitialState();

const ShoppingCartSlice = createSlice({
  name: 'shoppingCart',
  initialState,
  reducers: {
    setShoppingCart(state, action: PayloadAction<ShoppingCart>) {
      state.shoppingCart = action.payload;
    },
    addShoppingCart(state, action: PayloadAction<ShoppingCart>) {
        
    },
    removeShoppingCart(state, action: PayloadAction<ShoppingCart>) {

    },
    updateShoppingCart(state, action: PayloadAction<ShoppingCart>) {

    }
   
  }
});

export const {setShoppingCart, addShoppingCart, removeShoppingCart, updateShoppingCart  } = ShoppingCartSlice.actions

export default ShoppingCartSlice.reducer;