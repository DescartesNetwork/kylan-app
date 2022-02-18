import { configureStore } from '@reduxjs/toolkit'
import middleware from './middleware'

import ui from './ui.reducer'
import wallet from './wallet.reducer'

const store = configureStore({
  middleware,
  reducer: { ui, wallet },
})
export type AppState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
