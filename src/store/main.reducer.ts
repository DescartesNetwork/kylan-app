import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { PayState } from 'constant'

/**
 * Interface & Utility
 */

export type MainState = {
  printerType: PayState
}

/**
 * Store constructor
 */

const NAME = 'main'
const initialState: MainState = {
  printerType: PayState.Mint,
}

/**
 * Actions
 */

export const setPrinterType = createAsyncThunk(
  `${NAME}/setPrinterType`,
  async (printerType: PayState) => {
    return { printerType }
  },
)
/**
 * Usual procedure
 */

const slice = createSlice({
  name: NAME,
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    void builder.addCase(
      setPrinterType.fulfilled,
      (state, { payload }) => void Object.assign(state, payload),
    ),
})

export default slice.reducer
