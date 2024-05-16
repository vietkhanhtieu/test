import { createSlice } from '@reduxjs/toolkit'

export const searchResults = createSlice({
  name: 'searchResults',
  initialState: {
    searchKey: '',
    items: []
  },
  reducers: {
    storeSearchResults: (state, action) => {
      state.items = action.payload
      return state
    },
    setSearchKey: (state, action) => {
      state.searchKey = action.payload
      return state
    },
    clearSearch: (state) => {
      state.items = []
      state.searchKey = ''
      return state
    }
  }
})

export const { storeSearchResults, setSearchKey, clearSearch } = searchResults.actions

export default searchResults.reducer
