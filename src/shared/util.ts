import { account, utils } from '@senswap/sen-js'
import numbro from 'numbro'

import { net } from 'shared/runtime'
import { DataLoader } from './dataloader'

/**
 * Build a explorer url by context including addresses or transaction ids
 * @param addressOrTxId - Address or TxId
 * @returns
 */
export const solExplorer = (addressOrTxId: string): string => {
  if (account.isAddress(addressOrTxId)) {
    return `https://explorer.solana.com/address/${addressOrTxId}?cluster=${net}`
  }
  return `https://explorer.solana.com/tx/${addressOrTxId}?cluster=${net}`
}

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
    return `https://explorer.solana.com/address/${addressOrTxId}?cluster=${net}`
  }
  return `https://explorer.solana.com/tx/${addressOrTxId}?cluster=${net}`
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
 * Generate a random color
 * @param seed - Seed
 * @param opacity - Opacity
 * @returns
 */
export const randomColor = (seed?: string, opacity?: string | number) => {
  let hash = Math.floor(Math.random() * 16777215)
  if (seed) {
    hash = 0
    for (let i = 0; i < seed.length; i++) {
      hash = seed.charCodeAt(i) + ((hash << 5) - hash)
    }
  }
  var rgb = [0, 0, 0]
  for (let i = 0; i < 3; i++) {
    var value = (hash >> (i * 8)) & 255
    rgb[i] = value
  }
  return `rgba(${rgb[0]}, 100, ${rgb[1]},${opacity || 1})`
}

/**
 * Fetch coingecko data with cache
 * @param ticket - Token ticket
 * @returns
 */
export const fetchCGK = async (ticket = '') => {
  return DataLoader.load('fetchCGK' + ticket, () => utils.parseCGK(ticket))
}
