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
      '2vAEiACep3J1N2J6YY9gt4gAbbFEvuVdWgyu8KUkgzgn',
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
      'Cs6jYywHTAgdvjxn8xG4VkJJH8DXXy7zbtatzMUWoCMG',
      '2vAEiACep3J1N2J6YY9gt4gAbbFEvuVdWgyu8KUkgzgn',
    ],
  },
}

/**
 * Module exports
 */
export default conf
