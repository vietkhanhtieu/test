import { createSlice } from '@reduxjs/toolkit'

export const floatingChatWidget = createSlice({
  name: 'floatingChatWidget',
  initialState: {
    openChatWindow: false
  },
  reducers: {
    setOpenChatWindow: (state, action) => {
      state.openChatWindow = action.payload
      return state
    }
  }
})

export const { setOpenChatWindow } = floatingChatWidget.actions

export default floatingChatWidget.reducer
