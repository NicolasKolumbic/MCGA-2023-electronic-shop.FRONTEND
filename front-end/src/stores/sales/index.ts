import { Sale } from '@/models/sale';
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface SalesState {
    sales: Sale | undefined
}

const getInitialState = (): SalesState =>  {
    return {sales: undefined};
};

const initialState: SalesState = getInitialState();

const SalesSlice = createSlice({
  name: 'Sales',
  initialState,
  reducers: {
    setSales(state, action: PayloadAction<Sale>) {
      state.sales = action.payload;
    },
    addSale(state, action: PayloadAction<Sale>) {
        
    },
    removeSale(state, action: PayloadAction<Sale>) {

    },
    updateSale(state, action: PayloadAction<Sale>) {

    }
   
  }
});

export const {setSales, addSale, removeSale, updateSale  } = SalesSlice.actions

export default SalesSlice.reducer;