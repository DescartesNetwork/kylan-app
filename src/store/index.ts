import { devTools, bigintSerializationMiddleware } from 'shared/devTools'

import { configureStore } from '@reduxjs/toolkit'

import ui from './ui.reducer'
import wallet from './wallet.reducer'
import bid from './bid.reducer'
import pools from './pools.reducer'
import accounts from './accounts.reducer'
import mints from './mints.reducer'
import main from './main.reducer'

const store = configureStore({
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware(bigintSerializationMiddleware),
  devTools: devTools('kylan'),
  reducer: {
    ui,
    wallet,
    bid,
    pools,
    accounts,
    mints,
    main,
  },
})
export type AppState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
