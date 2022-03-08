import { AccountInfo, PublicKey } from '@solana/web3.js'
import { ChequeData } from '@project-kylan/core'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { account } from '@senswap/sen-js'

// import { MEMCMP } from 'constant'
import { RoleState } from './main.reducer'
import configs from 'configs'

const {
  sol: { printerAddress },
} = configs

/**
 * Interface & Utility
 */

export type ChequeState = Record<string, ChequeData>

/**
 * Store constructor
 */

const NAME = 'cheque'
const initialState: ChequeState = {}

/**
 * Actions
 */

export const filterCheques = (role: RoleState) => {
  const MEMCMP = {
    admin: {
      bytes: printerAddress,
      offset: 16,
    },
    user: {
      bytes: window.kylan.kylan.program.provider.wallet.publicKey.toBase58(),
      offset: 80,
    },
  }
  return MEMCMP[role]
}

export const getCheques = createAsyncThunk<ChequeState, void, { state: any }>(
  `${NAME}/getCheques`,
  async (_, { getState }) => {
    const { kylan } = window.kylan
    const { program } = kylan
    const {
      main: { role },
    } = getState()

    // Get all cheuqes from list mints address
    const value: Array<{ pubkey: PublicKey; account: AccountInfo<Buffer> }> =
      await program.provider.connection.getProgramAccounts(program.programId, {
        filters: [
          { dataSize: program.account.cheque.size },
          {
            memcmp: filterCheques(role),
          },
        ],
      })
    let bulk: ChequeState = {}
    value.forEach(({ pubkey, account: { data: buf } }) => {
      const address = pubkey.toBase58()
      const data = kylan.parseChequeData(buf)
      bulk[address] = data
    })
    return bulk
  },
)

export const getCheque = createAsyncThunk<
  ChequeState,
  { address: string },
  { state: any }
>(`${NAME}/getCheque`, async ({ address }, { getState }) => {
  const { kylan } = window.kylan
  if (!account.isAddress(address)) throw new Error('Invalid account address')
  const {
    cheques: { [address]: data },
  } = getState()
  if (data) return { [address]: data }
  const raw = await kylan.getChequeData(address)
  return { [address]: raw }
})

export const upsetCheque = createAsyncThunk<
  ChequeState,
  { address: string; data: ChequeData },
  { state: any }
>(`${NAME}/upsetCheque`, async ({ address, data }) => {
  if (!account.isAddress(address)) throw new Error('Invalid address')
  if (!data) throw new Error('Data is empty')
  return { [address]: data }
})

export const deleteCheque = createAsyncThunk(
  `${NAME}/deleteCheque`,
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
        getCheques.fulfilled,
        (state, { payload }) => void Object.assign(state, payload),
      )
      .addCase(
        getCheque.fulfilled,
        (state, { payload }) => void Object.assign(state, payload),
      )
      .addCase(
        upsetCheque.fulfilled,
        (state, { payload }) => void Object.assign(state, payload),
      )
      .addCase(
        deleteCheque.fulfilled,
        (state, { payload }) => void delete state[payload.address],
      ),
})

export default slice.reducer
