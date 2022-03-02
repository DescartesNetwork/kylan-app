import { Fragment } from 'react'
import UIWatcher from './ui.watcher'
import AccountWatcher from './account.watcher'
import WalletWatcher from './wallet.watcher'
import CertificateWatcher from './certificate.watcher'
import ChequeWatcher from './cheque.watcher'

const Watcher = () => {
  return (
    <Fragment>
      <UIWatcher />
      <AccountWatcher />
      <WalletWatcher />
      <CertificateWatcher />
      <ChequeWatcher />
    </Fragment>
  )
}

export default Watcher
