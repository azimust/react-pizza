import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"

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

export const fetchPizzas = createAsyncThunk<Pizza[], Record<string, string>>('pizza/fetchPizzasStatus', async (params) => {
    const {
        category,
        sortBy,
        order,
        search,
        page
    } = params

    const { data } = await axios.get<Pizza[]>(`https://648b18e717f1536d65ea596a.mockapi.io/items?page=${page}&limit=4&${category}&sortBy=${sortBy}&order=${order}&search=${search}`)

    return data
})

const initialState: PizzaSliceState = {
    items: [],
    status: 'loading'
}

const pizzaSlice = createSlice({
    name: 'pizza',
    initialState,
    reducers: {
        setItems(state, action: PayloadAction<Pizza[]>) {
            state.items = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchPizzas.pending, (state, action) => {
            state.items = []
            state.status = 'loading'
        })
        builder.addCase(fetchPizzas.fulfilled, (state, action) => {
            state.items = action.payload
            state.status = 'succes'
        })
        builder.addCase(fetchPizzas.rejected, (state, action) => {
            state.items = []
            state.status = 'error'
        })
    }
})

export const { setItems } = pizzaSlice.actions;

export default pizzaSlice.reducer