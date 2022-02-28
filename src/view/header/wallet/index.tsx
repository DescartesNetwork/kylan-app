import { CSSProperties } from 'react'
import { useWalletKit } from '@gokiprotocol/walletkit'

import PixelButton from 'components/pixelButton'
import IonIcon from 'components/ionicon'

const Wallet = ({ style = {} }: { style?: CSSProperties }) => {
  const { connect } = useWalletKit()

  return (
    <PixelButton
      style={style}
      suffix={<IonIcon name="wallet-outline" />}
      onClick={connect}
    >
      Connect Wallet
    </PixelButton>
  )
}

export default Wallet
