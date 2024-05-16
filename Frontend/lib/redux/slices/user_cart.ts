import { UserCart } from '@/lib/types/user'
import { createSlice } from '@reduxjs/toolkit'

const initialState: UserCart = {
  cart: [],
  total_amount: 0,
  total_quantity: 0,
  current_step: 1,
  shouldCheckStock: false,
  exceedStockItems: [],
  invalidLicenses: false,
  loadingFetch: false,
  listUpdating: [],
  selectedProducts: [],
  isFromReOrder: false
}

export const currentCart = createSlice({
  name: 'userCart',
  initialState: initialState,
  reducers: {
    setUserCart: (state, action) => {
      state.cart = action.payload.cart
      state.total_amount = action.payload.total_amount
      state.total_quantity = action.payload.total_quantity
      state.exceedStockItems = []
      state.shouldCheckStock = false

      return state
    },
    addItems: (state, action) => {
      let cart = [...state.cart]

      action.payload.items.forEach((i: any) => {
        const idx = cart.findIndex((c) => c.key === i.key)
        if (idx !== -1) {
          cart[idx] = i
        } else {
          cart = cart.concat(i)
        }
      })

      return {
        ...state,
        cart: cart,
        total_amount: state.total_amount + action.payload.total_amount,
        total_quantity: state.total_quantity + action.payload.total_quantity
      }
    },
    setCurrentStep: (state, action) => {
      state.current_step = action.payload.current_step
      return state
    },
    updateQuantity: (state, action) => {
      let item = state.cart.find((i) => i.key === action.payload.key)

      if (item) {
        item.quantity = action.payload.quantity
        const idx = state.cart.findIndex((i) => i.key === action.payload.key)
        if (idx !== -1) {
          state.cart[idx] = item
        }
      }
      state.total_amount = action.payload.total_amount
      state.total_quantity = action.payload.total_quantity
      return state
    },
    removeItems: (state, action) => {
      let newCart = [...state.cart]
      newCart = newCart.filter((i) => !action.payload.itemsToRemove.includes(i.key))
      state.cart = [...newCart]
      state.total_amount = action.payload.total_amount
      state.total_quantity = action.payload.total_quantity

      return state
    },
    setShouldCheckStock: (state, action) => {
      return {
        ...state,
        shouldCheckStock: action.payload.shouldCheckStock,
        exceedStockItems: action.payload.exceedStockItems
      }
    },
    setLoadingFetch: (state, action) => {
      return {
        ...state,
        loadingFetch: action.payload
      }
    },
    setInvalidLicenses: (state, action) => {
      return {
        ...state,
        invalidLicenses: action.payload.invalidLicenses
      }
    },
    addStatusUpdating: (state, action) => {
      const statusState = state.listUpdating
      statusState.push(action.payload)
      state.listUpdating = statusState
      return state
    },
    removeStatusUpdating: (state, action) => {
      state.listUpdating = state.listUpdating.filter((item) => item !== action.payload)
      return state
    },
    setSelectedProducts: (state, action) => {
      return {
        ...state,
        selectedProducts: action.payload.selectedProducts
      }
    },
    setIsFromReOrder: (state, action) => {
      return {
        ...state,
        isFromReOrder: action.payload.isFromReOrder
      }
    }
  }
})

export const {
  setUserCart,
  addItems,
  setCurrentStep,
  updateQuantity,
  removeItems,
  setShouldCheckStock,
  setLoadingFetch,
  setInvalidLicenses,
  addStatusUpdating,
  removeStatusUpdating,
  setSelectedProducts,
  setIsFromReOrder
} = currentCart.actions

export default currentCart.reducer
