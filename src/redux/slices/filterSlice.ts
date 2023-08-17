import { PayloadAction, createSlice } from "@reduxjs/toolkit"

type Rating = 'rating' | '-rating' | 'title' | '-title'

type Sort = {
    name: string,
    sortProperty: Rating
}

export interface FilterSliceState {
    searchValue: string,
    page: number,
    categoryId: number,
    sort: Sort
}

const initialState: FilterSliceState = {
    searchValue: '',
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
        setCategoryId(state, action: PayloadAction<number>) {
            state.categoryId = action.payload
        },
        setSearchValue(state, action: PayloadAction<string>) {
            state.searchValue = action.payload
        },
        setSort(state, action: PayloadAction<Sort>) {
            state.sort = action.payload
        },
        setCurrentPage(state, action: PayloadAction<number>) {
            state.page = action.payload
        },
        setFilters(state, action: PayloadAction<FilterSliceState>) {
            state.sort = action.payload.sort
            state.categoryId = Number(action.payload.categoryId)
            state.page = Number(action.payload.page)
        }
    }
})

export const { setCategoryId, setSort, setCurrentPage, setFilters, setSearchValue } = filterSlice.actions;

export default filterSlice.reducer