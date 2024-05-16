import { INotification } from '@/app/api/definitions/notification'
import { createSlice } from '@reduxjs/toolkit'

interface IInitialState {
  list: INotification[]
  modalList: INotification[]
}

const initialState: IInitialState = {
  list: [],
  modalList: []
}

export const notifications = createSlice({
  name: 'notifications',
  initialState: initialState,
  reducers: {
    setNotificationList: (state, action) => {
      state.list = action.payload
      return state
    },
    setNotificationModalList: (state, action) => {
      state.modalList = action.payload
      return state
    }
  }
})

export const { setNotificationList, setNotificationModalList } = notifications.actions

export default notifications.reducer
