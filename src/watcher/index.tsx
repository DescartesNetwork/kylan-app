import { Fragment } from 'react'
import UIWatcher from './ui.watcher'
import AccountWatcher from './account.watcher'
import WalletWatcher from './wallet.watcher'

const Watcher = () => {
  return (
    <Fragment>
      <UIWatcher />
      <AccountWatcher />
      <WalletWatcher />
    </Fragment>
  )
}

export default Watcher
