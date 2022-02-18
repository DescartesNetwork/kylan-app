import { CSSProperties, Fragment, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { account } from '@senswap/sen-js'

import { Button } from 'antd'
import Login from './login'
import IonIcon from 'components/ionicon'

import session from 'shared/session'
import { AppDispatch, AppState } from 'store'
import {
  connectWallet,
  openWallet,
  disconnectWallet,
} from 'store/wallet.reducer'
import {
  Coin98Wallet,
  PhantomWallet,
  SecretKeyWallet,
  SolletWallet,
  SlopeWallet,
  SolflareWallet,
  SolflareExtensionWallet,
} from './lib'
import PixelButton from 'components/ionicon/pixelButton'

const Wallet = ({ style = {} }: { style?: CSSProperties }) => {
  const dispatch = useDispatch<AppDispatch>()
  const { address } = useSelector((state: AppState) => state.wallet)

  const reconnect = () => {
    const walletType = session.get('WalletType')
    if (walletType === 'SecretKey')
      return new SecretKeyWallet(session.get('SecretKey'))
    if (walletType === 'Keystore')
      return new SecretKeyWallet(session.get('SecretKey'))
    if (walletType === 'Coin98') return new Coin98Wallet()
    if (walletType === 'Phantom') return new PhantomWallet()
    if (walletType === 'SolletWeb') return new SolletWallet()
    if (walletType === 'Slope') return new SlopeWallet()
    if (walletType === 'SolflareWeb') return new SolflareWallet()
    if (walletType === 'SolflareExtension') return new SolflareExtensionWallet()
    return null
  }

  useEffect(() => {
    if (account.isAddress(address)) return
    const wallet = reconnect()
    try {
      if (wallet) dispatch(connectWallet(wallet)).unwrap()
    } catch (er: any) {
      return window.notify({ type: 'error', description: er.message })
    }
  }, [dispatch, address])

  if (account.isAddress(address))
    return (
      <Button
        icon={<IonIcon name="power-outline" />}
        onClick={() => dispatch(disconnectWallet())}
        block
      >
        Disconnect
      </Button>
    )
  return (
    <Fragment>
      <PixelButton
        style={style}
        suffix={<IonIcon name="wallet-outline" />}
        onClick={() => dispatch(openWallet())}
      >
        Connect Wallet
      </PixelButton>
      <Login />
    </Fragment>
  )
}

export default Wallet
