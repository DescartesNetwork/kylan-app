import { net } from 'shared/runtime'
import sol from './sol.config'
import admin from './admin.config'

const configs = {
  sol: sol[net],
  admin: admin[net],
}

/**
 * Module exports
 */
export default configs
