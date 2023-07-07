import { configureStore } from "@reduxjs/toolkit";
import fiterReducer from './slices/filterSlice'
import cartReducer from "./slices/cartSlice";
import pizzaReducer from "./slices/pizzaSlice";

export const store = configureStore({
    reducer: {
        filter: fiterReducer,
        cart: cartReducer,
        pizza: pizzaReducer
    }
})