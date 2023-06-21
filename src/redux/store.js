import { configureStore } from "@reduxjs/toolkit";
import fiterReducer from './slices/filterSlice'
import cartReducer from "./slices/cartSlice";

export const store = configureStore({
    reducer: {
        filter: fiterReducer,
        cart: cartReducer
    }
})