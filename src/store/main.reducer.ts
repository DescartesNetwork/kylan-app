import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { PayState } from 'constant'

/**
 * Interface & Utility
 */

export type MainState = {
  printerType: PayState
  mintSelected: string
  available: number
  kylanBalance: number
}

/**
 * Store constructor
 */

const NAME = 'main'
const initialState: MainState = {
  printerType: PayState.Mint,
  mintSelected: '',
  available: 0,
  kylanBalance: 0,
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
export const onSelectedMint = createAsyncThunk(
  `${NAME}/onSelectedMint`,
  async (mintSelected: string) => {
    return { mintSelected }
  },
)
export const setAvailable = createAsyncThunk(
  `${NAME}/setAvailable`,
  async (available: number) => {
    return { available }
  },
)
export const setKylanBalance = createAsyncThunk(
  `${NAME}/setKylanBalance`,
  async (kylanBalance: number) => {
    return { kylanBalance }
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
    void builder
      .addCase(
        setPrinterType.fulfilled,
        (state, { payload }) => void Object.assign(state, payload),
      )
      .addCase(
        onSelectedMint.fulfilled,
        (state, { payload }) => void Object.assign(state, payload),
      )
      .addCase(
        setAvailable.fulfilled,
        (state, { payload }) => void Object.assign(state, payload),
      )
      .addCase(
        setKylanBalance.fulfilled,
        (state, { payload }) => void Object.assign(state, payload),
      ),
})

export default slice.reducer
