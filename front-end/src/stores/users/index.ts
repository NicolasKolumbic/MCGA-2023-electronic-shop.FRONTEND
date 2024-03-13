import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from 'firebase/auth';

interface UserState {
    email: string;
}

const getInitialState = (): UserState =>  {
    return {
        email: ''
    };
};

const initialState: UserState = getInitialState();

const UsersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        setUser(state, action: PayloadAction<string>) {
            state.email = action.payload;
        }
    }
});

export const { setUser } = UsersSlice.actions

export default UsersSlice.reducer;