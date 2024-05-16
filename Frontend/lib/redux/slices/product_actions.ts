import { createSlice } from '@reduxjs/toolkit'

export interface IFilterPrice {
  fixedRange: number[][]
  customRange: number[]
}

export interface IFilterOptions {
  treatmentGroup: string[]
  activeIngredientConcentration: string[]
  dosageForm: string[]
  price: IFilterPrice
  [k: string]: any
}

export interface ISortOption {
  treatmentGroup?: 'desc' | 'asc'
  activeIngredientConcentration?: 'desc' | 'asc'
  dosageForm?: 'desc' | 'asc'
  price?: 'desc' | 'asc'
}

interface IInitialState {
  filterOptions: IFilterOptions
  sortOption: ISortOption
}

const initialState: IInitialState = {
  filterOptions: {
    treatmentGroup: [],
    activeIngredientConcentration: [],
    dosageForm: [],
    price: {
      fixedRange: [],
      customRange: []
    }
  },
  sortOption: {}
}

export const productActions = createSlice({
  name: 'productActions',
  initialState: initialState,
  reducers: {
    setInitialProductActions: () => initialState,
    setFilterOptions: (state, action) => {
      state.filterOptions = action.payload
      return state
    },
    setSortOption: (state, action) => {
      state.sortOption = action.payload
      return state
    }
  }
})

export const { setInitialProductActions, setFilterOptions, setSortOption } = productActions.actions

export default productActions.reducer
