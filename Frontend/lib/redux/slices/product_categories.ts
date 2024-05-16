import { createSlice } from '@reduxjs/toolkit'

export const productCategories = createSlice({
  name: 'productCategories',
  initialState: {
    categories: [],
    drugCategories: []
  },
  reducers: {
    setProductCategoriesList: (state, action) => {
      state.categories = action.payload
      return state
    },
    setDrugCategories: (state, action) => {
      state.drugCategories = action.payload
      return state
    }
  }
})

export const { setProductCategoriesList, setDrugCategories } = productCategories.actions

export default productCategories.reducer
