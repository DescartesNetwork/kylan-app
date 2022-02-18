import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

/**
 * Interface & Utility
 */

export type BidState = {
  bidAmount: string
}

/**
 * Store constructor
 */

const NAME = 'bid'
const initialState: BidState = {
  bidAmount: '0',
}

/**
 * Actions
 */

export const setBidAmount = createAsyncThunk(
  `${NAME}/setBidAmount`,
  async (bidAmount: string) => {
    return { bidAmount }
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
      setBidAmount.fulfilled,
      (state, { payload }) => void Object.assign(state, payload),
    ),
})

export default slice.reducer
