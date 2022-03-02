import { Net } from 'shared/runtime'

/**
 * Contructor
 */
type Conf = {
  adminAddresses: string[]
}

const conf: Record<Net, Conf> = {
  /**
   * Development configurations
   */
  devnet: {
    adminAddresses: [
      'BkLRcJucoTF9GnxQUa94fkqZdoL9LTWCoT5gF54zVsJk',
      '8W6QginLcAydYyMYjxuyKQN56NzeakDE3aRFrAmocS6D',
    ],
  },

  /**
   * Staging configurations
   */
  testnet: {
    adminAddresses: [''],
  },

  /**
   * Production configurations
   */
  mainnet: {
    adminAddresses: [
      'BkLRcJucoTF9GnxQUa94fkqZdoL9LTWCoT5gF54zVsJk',
      '8W6QginLcAydYyMYjxuyKQN56NzeakDE3aRFrAmocS6D',
    ],
  },
}

/**
 * Module exports
 */
export default conf
