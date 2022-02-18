import { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { utils } from '@senswap/sen-js'

import { Avatar } from 'antd'

import session from 'shared/session'
import { AppState } from 'store'
import COIN98 from 'static/images/wallet/coin98.png'
import PHANTOM from 'static/images/wallet/phantom.png'
import SLOPE from 'static/images/wallet/slope.svg'
import SOLFLARE from 'static/images/wallet/solflare.png'
import SOLLET from 'static/images/wallet/sollet.png'

const IMAGES_WALLET: Record<string, string> = {
  coin98: COIN98,
  phantom: PHANTOM,
  slope: SLOPE,
  sollet: SOLLET,
  solfareWeb: SOLFLARE,
  solflareExtension: SOLFLARE,
}

const WalletAvatar = () => {
  const { address } = useSelector((state: AppState) => state.wallet)

  const wallet = useMemo(() => {
    const walletType = session.get('WalletType')
    return walletType.charAt(0).toLowerCase() + walletType.slice(1)
  }, [])

  return wallet === 'secretKey' ? (
    <Avatar size={24}>
      <span style={{ fontSize: 24 }}>{utils.randEmoji(address)}</span>
    </Avatar>
  ) : (
    <Avatar size={24} shape="circle" src={IMAGES_WALLET[wallet]} />
  )
}

export default WalletAvatar
