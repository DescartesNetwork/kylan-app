import Kylan, { AnchorWallet } from '@project-kylan/core'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { Lamports, SPLT } from '@senswap/sen-js'
import { web3 } from '@project-serum/anchor'

import configs from 'configs'

const {
  sol: { node, spltAddress, splataAddress },
} = configs

const dummyWallet: AnchorWallet = {
  signTransaction: async (_: web3.Transaction) => {
    throw new Error('Wallet is not connected')
  },
  signAllTransactions: async (_: web3.Transaction[]) => {
    throw new Error('Wallet is not connected')
  },
  publicKey: web3.SystemProgram.programId,
}

/**
 * Interface & Utility
 */

export type WalletState = {
  address: string
  lamports: bigint
}

window.kylan = {
  kylan: new Kylan(dummyWallet, node),
  lamports: new Lamports(node),
  splt: new SPLT(spltAddress, splataAddress, node),
}

const initializeWindow = async (wallet: AnchorWallet | undefined) => {
  window.kylan = {
    ...window.kylan,
    kylan: new Kylan(wallet || dummyWallet, node),
  }
}

const destroyWindow = async () => {
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
