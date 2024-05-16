import { createSlice } from '@reduxjs/toolkit'

interface Link {
  title: string
  url: string
}

interface IInitialState {
  links: Link[]
}

const initialState: IInitialState = {
  links: []
}

export const breadcrumb = createSlice({
  name: 'breadcrumb',
  initialState: initialState,
  reducers: {
    setLinks: (state, action) => {
      state.links = action.payload
      return state
    }
  }
})

export const { setLinks } = breadcrumb.actions

export default breadcrumb.reducer
