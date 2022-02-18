/// <reference types="react-scripts" />

/**
 * Declare global
 */
type SentreNotification = {
  type: 'error' | 'warning' | 'success' | 'info'
  description: string
  onClick?: () => void
}
interface Window {
  // Sentre
  sentre: {
    wallet?: import('@senswap/sen-js').WalletInterface
    lamports: import('@senswap/sen-js').Lamports
    splt: import('@senswap/sen-js').SPLT
    swap: import('@senswap/sen-js').Swap
  }
  // IPFS
  ipfs?: ReturnType<import('ipfs-core').create>
  // Utility
  notify: ({ type, description, onClick }: SentreNotification) => void
  goto: (url: string) => void
  // Partner wallets
  coin98: any
  solana: any
  Slope: any
  solflare: any
}

// For bigint serialization
interface BigInt {
  toJSON: (this: bigint) => string
}

/**
 * Declare namespace
 */
declare namespace JSX {
  interface IntrinsicElements {
    'ion-icon': any
  }
}
