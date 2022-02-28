import Kylan, { AnchorWallet } from '@project-kylan/core'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { Lamports, SPLT, Swap } from '@senswap/sen-js'

import configs from 'configs'

/**
 * Interface & Utility
 */

export type WalletState = {
  address: string
  lamports: bigint
}

const initializeWindow = async (wallet: AnchorWallet | undefined) => {
  const {
    sol: { node, spltAddress, splataAddress, swapAddress },
  } = configs
  window.kylan = {
    wallet,
    kylan: wallet && new Kylan(wallet),
    lamports: new Lamports(node),
    splt: new SPLT(spltAddress, splataAddress, node),
    swap: new Swap(swapAddress, spltAddress, splataAddress, node),
  }
}

const destroyWindow = async () => {
  // if (window.kylan?.wallet) window.kylan.wallet.disconnect()
  await initializeWindow(undefined)
}

/**
 * Store constructor
 */

const NAME = 'wallet'
const initialState: WalletState = {
  address: '',
  lamports: BigInt(0),
}

/**
 * Actions
 */

export const initializeWallet = createAsyncThunk(
  `${NAME}/initializeWallet`,
  async ({ wallet }: { wallet: any }) => {
    if (!wallet) throw new Error('Invalid wallet instance')
    await initializeWindow(wallet)
    const walletAddress = wallet.publicKey.toBase58()
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
        initializeWallet.fulfilled,
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
