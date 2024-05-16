import type { Action, ThunkAction } from '@reduxjs/toolkit'
import { combineSlices, configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { persistReducer, persistStore } from 'redux-persist'
import { FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE } from 'redux-persist'
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2'
import storage from 'redux-persist/lib/storage'

import breadcrumbReducer from './slices/breadcrumb'
import currentUserReducer from './slices/current_user'
import floatingChatWidgetReducer from './slices/floating_chat_widget'
import notificationsReducer from './slices/notifications'
import productActionsReducer from './slices/product_actions'
import productCategoriesReducer from './slices/product_categories'
import refundOrdersReducer from './slices/refund_order'
import searchResultsReducer from './slices/search_results'
import termsAndConditionsMenuReducer from './slices/terms_and_conditions'
import treatmentItemReducer from './slices/treatment_item'
import currentCartReducer from './slices/user_cart'
import vouchersReducer from './slices/vouchers'

const rootPersistConfig = {
  key: 'root',
  storage,
  stateReconciler: autoMergeLevel2
}

const userPersistConfig = {
  key: 'currentUser',
  storage
}

const userCartConfig = {
  key: 'userCart',
  storage
}

// `combineSlices` automatically combines the reducers using
// their `reducerPath`s, therefore we no longer need to call `combineReducers`.
const rootReducer = combineSlices({
  breadcrumb: breadcrumbReducer,
  currentUser: persistReducer(userPersistConfig, currentUserReducer),
  floatingChatWidget: floatingChatWidgetReducer,
  notifications: notificationsReducer,
  productActions: productActionsReducer,
  productCategories: productCategoriesReducer,
  refundOrders: refundOrdersReducer,
  searchResults: searchResultsReducer,
  termsAndConditionsMenu: termsAndConditionsMenuReducer,
  treatmentItem: treatmentItemReducer,
  userCart: persistReducer(userCartConfig, currentCartReducer),
  vouchers: vouchersReducer
})

const persistedReducer = persistReducer<RootState>(rootPersistConfig, rootReducer)

// Infer the `RootState` type from the root reducer
export type RootState = ReturnType<typeof rootReducer>

// `makeStore` encapsulates the store configuration to allow
// creating unique store instances, which is particularly important for
// server-side rendering (SSR) scenarios. In SSR, separate store instances
// are needed for each request to prevent cross-request state pollution.
export const makeStore = () => {
  return configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
        }
      })
  })
}

const store = makeStore()

setupListeners(store.dispatch)

const persistedStore = persistStore(store)

export { store, persistedStore }

// Infer the return type of `makeStore`
export type AppStore = ReturnType<typeof makeStore>
// Infer the `AppDispatch` type from the store itself
export type AppDispatch = AppStore['dispatch']
export type AppThunk<ThunkReturnType = void> = ThunkAction<
  ThunkReturnType,
  RootState,
  unknown,
  Action
>
