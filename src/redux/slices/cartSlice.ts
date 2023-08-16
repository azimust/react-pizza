import { createSlice } from "@reduxjs/toolkit"

type CartItem = {
    id: number,
    count: number,
    name: string,
    type: string,
    image: string,
    price: number,
    size: number,
}

interface CartSliceState {
    totalSum: number,
    items: CartItem[]
}

const initialState: CartSliceState = {
    totalSum: 0,
    items: []
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItem(state, action) {
            const findItem = state.items.find((obj) => obj.id === action.payload.id);

            if (findItem) {
                findItem.count++
            } else {
                state.items.push({
                    ...action.payload,
                    count: 1
                })
            }

            state.totalSum = state.items.reduce((sum, obj) => {
                return (obj.price * obj.count) + sum
            }, 0)
        },
        removeItem(state, action) {
            state.items = state.items.filter((obj) => obj.id !== action.payload)
            state.totalSum = 0;
        },
        clearItems(state) {
            state.items = [];
            state.totalSum = 0;
        },
        minusItem(state, action) {
            const findItem = state.items.find((obj) => obj.id === action.payload);

            if (findItem) {
                findItem.count--
            }
        },
    }
})

export const { addItem, removeItem, clearItems, minusItem } = cartSlice.actions;

export default cartSlice.reducer