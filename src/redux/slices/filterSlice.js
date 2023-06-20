import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    page: 1,
    categoryId: 0,
    sort: {
        name: 'популярности', sortProperty: 'rating'
    }
}

const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        setCategoryId(state, action) {
            state.categoryId = action.payload
        },
        setSort(state, action) {
            state.sort = action.payload
        },
        setCurrentPage(state, action) {
            state.page = action.payload
        },
        setFilters(state, action) {
            state.sort = action.payload
            state.categoryId = Number(action.payload.categoryId)
            state.page = Number(action.payload.page)
        }
    }
})

export const { setCategoryId, setSort, setCurrentPage, setFilters } = filterSlice.actions;

export default filterSlice.reducer