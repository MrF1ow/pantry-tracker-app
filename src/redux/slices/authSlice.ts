import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface IAuthState {
    authState: boolean;
    user: {
        email: string;
        uid: string;
    };
};

const initialState: IAuthState = {
    authState: false,
    user: {
        email: '',
        uid: '',
    },
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAuthState: (state, action: PayloadAction<boolean>) => {
            state.authState = action.payload;
        },
        setUser: (state, action: PayloadAction<{ email: string, uid: string }>) => {
            state.user = action.payload;
        },
    },
})

export const { setAuthState, setUser } = authSlice.actions;
export const authReducer = authSlice.reducer;