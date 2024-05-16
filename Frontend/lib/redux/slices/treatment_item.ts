import { createSlice } from '@reduxjs/toolkit'

export const treatmentItem = createSlice({
  name: 'treatmentItem',
  initialState: {
    icon: '',
    treatmentName: ''
  },
  reducers: {
    setTreatmentItem: (state, action) => {
      state.icon = action.payload.icon
      state.treatmentName = action.payload.treatmentName
      return state
    }
  }
})

export const { setTreatmentItem } = treatmentItem.actions

export default treatmentItem.reducer
