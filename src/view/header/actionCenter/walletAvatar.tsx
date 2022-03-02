import { useSolana } from '@gokiprotocol/walletkit'

import { Avatar } from 'antd'

const WalletAvatar = () => {
  const { walletProviderInfo } = useSolana()

  return (
    <Avatar
      size={24}
      shape="circle"
      className="avt-img"
      src={(walletProviderInfo as any)?.icon()}
    />
  )
}

export default WalletAvatar
