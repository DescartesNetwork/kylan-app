import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { account, MintData } from '@senswap/sen-js'
import schema_1 from '@senswap/sen-js/dist/schema'
import { useSolana } from '@gokiprotocol/walletkit'

const soproxABI = require('soprox-abi')

/**
 * Interface & Utility
 */

export type MintsState = Record<string, MintData>

/**
 * Store constructor
 */

const NAME = 'mints'
const initialState: MintsState = {}

/**
 * Actions
 */

const parseMintData = (data: Buffer) => {
  const layout = new soproxABI.struct(schema_1.MINT_SCHEMA)
  if (data.length !== layout.space) return null
  layout.fromBuffer(data)
  return layout.value
}

export const getMint = createAsyncThunk<
  MintsState,
  { address: string; force?: boolean },
  { state: any }
>(`${NAME}/getMint`, async ({ address, force = false }, { getState }) => {
  if (!account.isAddress(address)) throw new Error('Invalid mint address')
  if (!force) {
    const {
      accounts: { [address]: data },
    } = getState()
    if (data) return { [address]: data }
  }
  const { provider } = useSolana()
  const publicKey = account.fromAddress(address)
  const { data } = (await provider.connection.getAccountInfo(publicKey)) || {}
  let raw
  if (data) raw = parseMintData(data)
  return { [address]: raw }
})

export const upsetMint = createAsyncThunk<
  MintsState,
  { address: string; data: MintData },
  { state: any }
>(`${NAME}/upsetMint`, async ({ address, data }) => {
  if (!account.isAddress(address)) throw new Error('Invalid address')
  if (!data) throw new Error('Data is empty')
  return { [address]: data }
})

export const deleteMint = createAsyncThunk(
  `${NAME}/deleteMint`,
  async ({ address }: { address: string }) => {
    if (!account.isAddress(address)) throw new Error('Invalid address')
    return { address }
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
        getMint.fulfilled,
        (state, { payload }) => void Object.assign(state, payload),
      )
      .addCase(
        upsetMint.fulfilled,
        (state, { payload }) => void Object.assign(state, payload),
      )
      .addCase(
        deleteMint.fulfilled,
        (state, { payload }) => void delete state[payload.address],
      ),
})

export default slice.reducer
