import { createSlice } from '@reduxjs/toolkit';

const firebaseSlice = createSlice({
    name: 'firebase',
    initialState: {
        app: null,
        auth: null,
    },
    reducers: {
        setFirebaseInterface(state, action) {
            state.app = action.payload.app;
            state.auth = action.payload.auth;
        }
    }
})

export const { setFirebaseInterface } = firebaseSlice.actions;
export const firebaseReducer = firebaseSlice.reducer;