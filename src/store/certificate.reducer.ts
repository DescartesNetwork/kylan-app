import { AccountInfo, PublicKey } from '@solana/web3.js'
import { CertData } from '@project-kylan/core'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { account } from '@senswap/sen-js'

/**
 * Interface & Utility
 */

export type CertificateState = Record<string, CertData>

/**
 * Store constructor
 */

const NAME = 'certificate'
const initialState: CertificateState = {}

/**
 * Actions
 */

export const getCertificates = createAsyncThunk(
  `${NAME}/getCertificates`,
  async () => {
    const { kylan } = window.kylan
    const { program } = kylan
    // Get all certs
    const value: Array<{ pubkey: PublicKey; account: AccountInfo<Buffer> }> =
      await program.provider.connection.getProgramAccounts(program.programId, {
        filters: [{ dataSize: program.account.cert.size }],
      })
    let bulk: CertificateState = {}
    value.forEach(({ pubkey, account: { data: buf } }) => {
      const address = pubkey.toBase58()
      const data = kylan.parseCertData(buf)
      bulk[address] = data
    })
    return bulk
  },
)

export const getCertificate = createAsyncThunk<
  CertificateState,
  { address: string },
  { state: any }
>(`${NAME}/getCertificate`, async ({ address }, { getState }) => {
  const { kylan } = window.kylan
  if (!account.isAddress(address)) throw new Error('Invalid account address')
  const {
    certificates: { [address]: data },
  } = getState()
  if (data) return { [address]: data }
  const raw = await kylan.getCertData(address)
  return { [address]: raw }
})

export const upsetCertificate = createAsyncThunk<
  CertificateState,
  { address: string; data: CertData },
  { state: any }
>(`${NAME}/upsetCertificate`, async ({ address, data }) => {
  if (!account.isAddress(address)) throw new Error('Invalid address')
  if (!data) throw new Error('Data is empty')
  return { [address]: data }
})

export const deleteCertificate = createAsyncThunk(
  `${NAME}/deleteAccount`,
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
        getCertificates.fulfilled,
        (state, { payload }) => void Object.assign(state, payload),
      )
      .addCase(
        getCertificate.fulfilled,
        (state, { payload }) => void Object.assign(state, payload),
      )
      .addCase(
        upsetCertificate.fulfilled,
        (state, { payload }) => void Object.assign(state, payload),
      )
      .addCase(
        deleteCertificate.fulfilled,
        (state, { payload }) => void delete state[payload.address],
      ),
})

export default slice.reducer
