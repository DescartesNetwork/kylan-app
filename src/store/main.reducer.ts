import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { PayState, Role } from 'constant'

/**
 * Interface & Utility
 */
export type RoleState = 'admin' | 'user'

export type MainState = {
  printerType: PayState
  mintSelected: string
  role: RoleState
}

/**
 * Store constructor
 */

const NAME = 'main'
const initialState: MainState = {
  printerType: PayState.Mint,
  mintSelected: '',
  role: Role.user,
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
export const updateRole = createAsyncThunk(
  `${NAME}/updateRole`,
  async (role: string) => {
    return { role }
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
        updateRole.fulfilled,
        (state, { payload }) => void Object.assign(state, payload),
      ),
})

export default slice.reducer
