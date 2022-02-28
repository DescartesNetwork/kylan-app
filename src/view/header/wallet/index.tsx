import { CSSProperties, Fragment, useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { useWalletKit, useSolana } from '@gokiprotocol/walletkit'

import IonIcon from 'components/ionicon'

import PixelButton from 'components/pixelButton'
import { AppDispatch } from 'store'
import { initializeWindowKylan } from 'store/wallet.reducer'
import { account } from '@senswap/sen-js'

const Wallet = ({ style = {} }: { style?: CSSProperties }) => {
  const dispatch = useDispatch<AppDispatch>()
  const { connect } = useWalletKit()
  const { wallet, publicKey } = useSolana()
  const walletAddress = publicKey?.toBase58() || ''

  const onConnectWallet = useCallback(async () => {
    await connect()
    if (!wallet || !account.isAddress(walletAddress)) return
    dispatch(initializeWindowKylan({ wallet, walletAddress }))
  }, [connect, dispatch, wallet, walletAddress])

  return (
    <Fragment>
      <PixelButton
        style={style}
        suffix={<IonIcon name="wallet-outline" />}
        onClick={onConnectWallet}
      >
        Connect Wallet
      </PixelButton>
    </Fragment>
  )
}

export default Wallet
