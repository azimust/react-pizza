import { useDispatch } from 'react-redux';
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

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()