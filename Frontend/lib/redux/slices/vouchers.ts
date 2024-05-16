import { ICoupon } from '@/app/api/definitions/voucher'
import { createSlice } from '@reduxjs/toolkit'

interface IInitialState {
  selectedCoupon: ICoupon | null
  selectedCouponList: ICoupon[]
}

const initialState: IInitialState = {
  selectedCoupon: null,
  selectedCouponList: []
}

export const vouchers = createSlice({
  name: 'vouchers',
  initialState: initialState,
  reducers: {
    setSelectedCoupon: (state, action) => {
      state.selectedCoupon = action.payload
      return state
    },
    setSelectedCouponList: (state, action) => {
      state.selectedCouponList = action.payload
      return state
    }
  }
})

export const { setSelectedCoupon, setSelectedCouponList } = vouchers.actions

export default vouchers.reducer
