import { configureStore } from "@reduxjs/toolkit";
import fiterReducer from './slices/filterSlice'

export const store = configureStore({
    reducer: {
        filter: fiterReducer,
    }
})