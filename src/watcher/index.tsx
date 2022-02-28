import { Fragment } from 'react'
import UIWatcher from './ui.watcher'
import AccountWatcher from './account.watcher'
import WalletWatcher from './wallet.watcher'
import CertificateWatcher from './certificate.watcher'

const Watcher = () => {
  return (
    <Fragment>
      <UIWatcher />
      <AccountWatcher />
      <WalletWatcher />
      <CertificateWatcher />
    </Fragment>
  )
}

export default Watcher
