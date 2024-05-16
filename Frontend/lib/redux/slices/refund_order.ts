import { OrderRefund } from '@/lib/types/order'
import { createSlice } from '@reduxjs/toolkit'

const initialState: OrderRefund = {
  order_id: '',
  message: 'Sản phẩm bị hư hỏng/ bể vỡ',
  status: 0,
  message_detail: '',
  product_info: []
}

export const refundOrders = createSlice({
  name: 'refundOrders',
  initialState: initialState,
  reducers: {
    setOrder: (state, action) => {
      state.order_id = action.payload
      return state
    },
    setStatus: (state, action) => {
      state.status = action.payload
      return state
    },
    setMessage: (state, action) => {
      state.message = action.payload
      return state
    },
    setMessageDetail: (state, action) => {
      state.message_detail = action.payload
      return state
    },
    setInitState: (state) => {
      return initialState
    }
  }
})

export const { setOrder, setMessage, setMessageDetail, setInitState, setStatus } =
  refundOrders.actions

export default refundOrders.reducer
