import { Category } from '@/models/category';
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface CategoriesState {
    categories: Category[]
    category?: Category
}

const getInitialState = (): CategoriesState =>  {
    return {
      categories: [],
      category: undefined
    };
};

const initialState: CategoriesState = getInitialState();

const CategoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    setCategories(state, action: PayloadAction<Category[]>) {
      state.categories = action.payload;
    },
    addCategory(state, action: PayloadAction<Category>) {
        state.category = action.payload;
    },
    removeCategory(state, action: PayloadAction<Category>) {

    },
    updateCategory(state, action: PayloadAction<Category>) {

    },
    editCategory(state, action: PayloadAction<Category>) {
        state.category = action.payload;
    },
    getCategoryById(state, action: PayloadAction<string>) {

        const query = fetch(`http://localhost:3005/api/v1/category/${action.payload}`);
        query.then((res: Response) => res.json()).then((category: Category) => {
          state.category = category
        });
      
    }

  }
});

export const {setCategories, addCategory, removeCategory, updateCategory, editCategory, getCategoryById  } = CategoriesSlice.actions

export default CategoriesSlice.reducer;