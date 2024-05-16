import { ITermsAndConditions } from '@/lib/types/terms_and_conditions'
import { createSlice } from '@reduxjs/toolkit'

interface State {
  items: ITermsAndConditions[]
  fetching: boolean
}

const initialState: State = {
  fetching: false,
  items: []
}

export const termsAndConditionsMenu = createSlice({
  name: 'termsAndConditionsMenu',
  initialState: initialState,
  reducers: {
    setTermsAndConditionsMenuItems: (state, action) => {
      return { ...state, items: action.payload.items, fetching: false }
    },
    setFetching: (state, action) => {
      return { ...state, fetching: action.payload.fetching }
    }
  }
})

export const { setTermsAndConditionsMenuItems, setFetching } = termsAndConditionsMenu.actions

export default termsAndConditionsMenu.reducer
