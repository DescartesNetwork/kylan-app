import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import configs from 'configs'

const {
  sol: { printerAddress },
} = configs

/**
 * Interface & Utility
 */

export type PrinterState = {
  authority?: string
  stableToken?: string
}

/**
 * Store constructor
 */

const NAME = 'printer'
const initialState: PrinterState = {}

/**
 * Actions
 */

export const getPrinterData = createAsyncThunk(
  `${NAME}/getPrinterData`,
  async () => {
    const { kylan } = window.kylan
    const { authority, stableToken } = await kylan.getPrinterData(
      printerAddress,
    )
    return {
      authority: authority.toBase58(),
      stableToken: stableToken.toBase58(),
    }
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
      getPrinterData.fulfilled,
      (state, { payload }) => void Object.assign(state, payload),
    ),
})

export default slice.reducer
