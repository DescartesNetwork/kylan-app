import { BN } from '@project-serum/anchor'
import { account, utils } from '@senswap/sen-js'
import { web3 } from '@project-serum/anchor'
import numbro from 'numbro'

import { net } from 'shared/runtime'
import { DataLoader } from './dataloader'

const EMPTY_ADDRESS = web3.SystemProgram.programId.toBase58()

/**
 * Delay by async/await
 * @param ms - milisenconds
 * @returns
 */
export const asyncWait = (ms: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

/**
 * Shorten a long address
 * @param address - The long address
 * @param num - The number of the heading and trailing characters
 * @param delimiter - The delimiter
 * @returns Shortened address
 */
export const shortenAddress = (address: string, num = 4, delimiter = '...') => {
  return (
    address.substring(0, num) +
    delimiter +
    address.substring(address.length - num, address.length)
  )
}

/**
 * Build a explorer url by context including addresses or transaction ids
 * @param addressOrTxId - Address or TxId
 * @returns
 */
export const explorer = (addressOrTxId: string): string => {
  if (account.isAddress(addressOrTxId)) {
    return `https://solscan.io/account/${addressOrTxId}?cluster=${net}`
  }
  return `https://solscan.io/tx/${addressOrTxId}?cluster=${net}`
}

/**
 * Wrapped Numbro - https://numbrojs.com/old-format.html
 * @param value - value
 * @returns
 */
export const numeric = (
  value?: number | string | BigInt,
): ReturnType<typeof numbro> => {
  if (!value) return numbro('0')
  return numbro(value)
}

/**
 * Fetch coingecko data with cache
 * @param ticket - Token ticket
 * @returns
 */
export const fetchCGK = async (ticket = '') => {
  return DataLoader.load('fetchCGK' + ticket, () => utils.parseCGK(ticket))
}

export const rate2Price = (rate: BN, secureTokenDecimals: number) => {
  return 10 ** (secureTokenDecimals - 12) * rate.toNumber()
}

export const price2Rate = (price: number, secureTokenDecimals: number) => {
  return new BN(Math.floor(price * 10 ** (12 - secureTokenDecimals)))
}

export const isWalletAddress = (walletAddress: string) => {
  if (account.isAddress(walletAddress) && walletAddress !== EMPTY_ADDRESS)
    return true
  return false
}
