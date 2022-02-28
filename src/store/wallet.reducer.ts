import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { Lamports, SPLT, Swap, WalletInterface } from '@senswap/sen-js'

import configs from 'configs'

/**
 * Interface & Utility
 */

export type WalletState = {
  visible: boolean
  address: string
  lamports: bigint
}

const initializeWindow = async (wallet: WalletInterface | undefined) => {
  const {
    sol: { node, spltAddress, splataAddress, swapAddress },
  } = configs
  window.kylan = {
    wallet,
    lamports: new Lamports(node),
    splt: new SPLT(spltAddress, splataAddress, node),
    swap: new Swap(swapAddress, spltAddress, splataAddress, node),
  }
}

const destroyWindow = async () => {
  if (window.kylan?.wallet) window.kylan.wallet.disconnect()
  await initializeWindow(undefined)
}

/**
 * Store constructor
 */

const NAME = 'wallet'
const initialState: WalletState = {
  visible: false,
  address: '',
  lamports: BigInt(0),
}

/**
 * Actions
 */

export const openWallet = createAsyncThunk(`${NAME}/openWallet`, async () => {
  return { visible: true }
})

export const closeWallet = createAsyncThunk(`${NAME}/closeWallet`, async () => {
  return { visible: false }
})

export const initializeWindowKylan = createAsyncThunk(
  `${NAME}/initializeWindowKylan`,
  async ({ wallet, walletAddress }: { wallet: any; walletAddress: string }) => {
    if (!wallet) throw new Error('Invalid wallet instance')
    await initializeWindow(wallet)
    const lamports = await window.kylan.lamports.getLamports(walletAddress)
    return {
      address: walletAddress,
      lamports: BigInt(lamports),
      visible: false,
    }
  },
)

export const updateWallet = createAsyncThunk(
  `${NAME}/updateWallet`,
  async ({ lamports }: Partial<WalletState>) => {
    return { lamports }
  },
)

export const disconnectWallet = createAsyncThunk(
  `${NAME}/disconnectWallet`,
  async () => {
    await destroyWindow()
    window.location.reload() // Reset all redux store
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
        openWallet.fulfilled,
        (state, { payload }) => void Object.assign(state, payload),
      )
      .addCase(
        closeWallet.fulfilled,
        (state, { payload }) => void Object.assign(state, payload),
      )
      .addCase(
        initializeWindowKylan.fulfilled,
        (state, { payload }) => void Object.assign(state, payload),
      )
      .addCase(
        updateWallet.fulfilled,
        (state, { payload }) => void Object.assign(state, payload),
      )
      .addCase(
        disconnectWallet.fulfilled,
        (state, { payload }) => void Object.assign(state, payload),
      ),
})

export default slice.reducer
