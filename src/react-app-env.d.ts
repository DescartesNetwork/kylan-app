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
  // Kylan
  kylan: {
    kylan: import('@project-kylan/core').default
    lamports: import('@senswap/sen-js').Lamports
    splt: import('@senswap/sen-js').SPLT
  }
  // Utility
  notify: ({ type, description, onClick }: SentreNotification) => void
}

// For bigint serialization
interface BigInt {
  toJSON: (this: bigint) => string
}

/**
 * Declare module
 */
declare module '*.md'
declare module 'flexsearch'

/**
 * Declare namespace
 */
declare namespace JSX {
  interface IntrinsicElements {
    'ion-icon': any
  }
}
