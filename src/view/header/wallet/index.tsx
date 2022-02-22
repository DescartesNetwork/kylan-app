import { CSSProperties, Fragment } from 'react'
import { useWalletKit } from '@gokiprotocol/walletkit'

import IonIcon from 'components/ionicon'

import PixelButton from 'components/ionicon/pixelButton'

const Wallet = ({ style = {} }: { style?: CSSProperties }) => {
  const { connect } = useWalletKit()

  return (
    <Fragment>
      <PixelButton
        style={style}
        suffix={<IonIcon name="wallet-outline" />}
        onClick={connect}
      >
        Connect Wallet
      </PixelButton>
    </Fragment>
  )
}

export default Wallet
