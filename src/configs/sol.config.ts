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
    printerAddress: 'FpsYwMmDKkQ4sjUF2Cpp3imzUo8MZGWVG93eSPmHCR7',
    //printerAddress: 'FU4eGvLK9tSZGNZvL4qCmjDsb6owxWa3Lshvf2pzKPAV',
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
  },

  /**
   * Production configurations
   */
  mainnet: {
    ...SOLVARS,
    node: 'https://ssc-dao.genesysgo.net/',
    chainId: 101,
    swapAddress: 'SSW7ooZ1EbEognq5GosbygA3uWW1Hq1NsFq6TsftCFV',
    taxmanAddress: '9doo2HZQEmh2NgfT3Yx12M89aoBheycYqH1eaR5gKb3e',
    printerAddress: '4PVGL3F1dib67AsTm8nHSU1cchzq61HPSmgKogG4vd94',
  },
}

/**
 * Module exports
 */
export default conf
