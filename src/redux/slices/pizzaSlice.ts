import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"

export const fetchPizzas = createAsyncThunk('pizza/fetchPizzasStatus', async (params) => {
    const {
        category,
        sortBy,
        order,
        search,
        page
    } = params

    const { data } = await axios.get(`https://648b18e717f1536d65ea596a.mockapi.io/items?page=${page}&limit=4&${category}&sortBy=${sortBy}&order=${order}&search=${search}`)

    return data
})

type Pizza = {
    id: number,
    count: number,
    name: string,
    type: string,
    image: string,
    price: number,
    size: number,
}

interface PizzaSliceState {
    items: Pizza[],
    status: 'loading' | 'succes' | 'error'
}

const initialState: PizzaSliceState = {
    items: [],
    status: 'loading'
}

const pizzaSlice = createSlice({
    name: 'pizza',
    initialState,
    reducers: {
        setItems(state, action) {
            state.items = action.payload
        }
    },
    extraReducers: {
        [fetchPizzas.pending]: (state) => {
            state.items = []
            state.status = 'loading'
        },
        [fetchPizzas.fulfilled]: (state, action) => {
            state.items = action.payload
            state.status = 'succes'
        },
        [fetchPizzas.rejected]: (state) => {
            state.items = []
            state.status = 'error'
        }
    }
})

export const { setItems } = pizzaSlice.actions;

export default pizzaSlice.reducer