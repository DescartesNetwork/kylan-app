import { Net } from 'shared/runtime'

const SOLVARS = {
  spltAddress: 'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA',
  splataAddress: 'ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL',
}

/**
 * Contructor
 */
type Conf = {
  node: string
  chainId: 101 | 102 | 103
  swapAddress: string
  taxmanAddress: string
  printerAddress: string
  stableTokenAddress: string
} & typeof SOLVARS

const conf: Record<Net, Conf> = {
  /**
   * Development configurations
   */
  devnet: {
    ...SOLVARS,
    node: 'https://api.devnet.solana.com',
    chainId: 103,
    swapAddress: '4erFSLP7oBFSVC1t35jdxmbfxEhYCKfoM6XdG2BLR3UF',
    taxmanAddress: '8UaZw2jDhJzv5V53569JbCd3bD4BnyCfBH3sjwgajGS9',
    // printerAddress: '3eTgCb3SXPCQZEUg6heAah2oD2f4qwjhacdUz3T5dc2s',
    printerAddress: 'FpsYwMmDKkQ4sjUF2Cpp3imzUo8MZGWVG93eSPmHCR7',
    stableTokenAddress: 'Vp15BGrUdTKPNDW4rkFm4ksoPHDTcg16Q7p3fwR4SPZ',
  },

  /**
   * Staging configurations
   */
  testnet: {
    ...SOLVARS,
    node: 'https://api.testnet.solana.com',
    chainId: 102,
    swapAddress: '',
    taxmanAddress: '',
    printerAddress: '',
    stableTokenAddress: '',
  },

  /**
   * Production configurations
   */
  mainnet: {
    ...SOLVARS,
    node: 'https://solana-api.projectserum.com',
    chainId: 101,
    swapAddress: 'SSW7ooZ1EbEognq5GosbygA3uWW1Hq1NsFq6TsftCFV',
    taxmanAddress: '9doo2HZQEmh2NgfT3Yx12M89aoBheycYqH1eaR5gKb3e',
    printerAddress: 'EJuHBZ8G78wzuoaAxo3TxdZGnmEc9NxV8gvsNeANmPru',
    stableTokenAddress: 'AT5CEW4zLMNwMEQPi9oSXSMAiHvX1bYXVpFi5JgwoMhx',
  },
}

/**
 * Module exports
 */
export default conf
