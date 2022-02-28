import { Fragment } from 'react'
import UIWatcher from './ui.watcher'
import AccountWatcher from './account.watcher'
import PoolWatcher from './pool.watcher'
import WalletWatcher from './wallet.watcher'

const Watcher = () => {
  return (
    <Fragment>
      <UIWatcher />
      <AccountWatcher />
      <PoolWatcher />
      <WalletWatcher />
    </Fragment>
  )
}

export default Watcher
