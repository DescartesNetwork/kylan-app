import { useSelector } from 'react-redux'
import { useWalletKit } from '@gokiprotocol/walletkit'
import { account } from '@senswap/sen-js'

import PixelButton from 'components/pixelButton'
import PrinterButton from './printerButton'

import IonIcon from 'components/ionicon'
import { AppState } from 'store'

const ConnectWallet = () => {
  const { connect } = useWalletKit()

  return (
    <PixelButton
      onClick={connect}
      suffix={<IonIcon name="wallet-outline" />}
      block
    >
      Connect wallet
    </PixelButton>
  )
}

const MintAction = () => {
  const {
    wallet: { address: walletAddress },
  } = useSelector((state: AppState) => state)

  if (account.isAddress(walletAddress)) return <PrinterButton />
  return <ConnectWallet />
}

export default MintAction
