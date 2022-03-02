import { useCallback } from 'react'
import { useSolana } from '@gokiprotocol/walletkit'

import { Typography, Space } from 'antd'
import IonIcon from 'components/ionicon'

import { net, onSwitchNetwork } from 'shared/runtime'

enum GokitNetwork {
  mainnet = 'mainnet-beta',
  devnet = 'devnet',
}

const Network = () => {
  const { setNetwork } = useSolana()

  const next = net === 'mainnet' ? 'devnet' : 'mainnet'

  const onSwitch = useCallback(async () => {
    await setNetwork(GokitNetwork[next])
    onSwitchNetwork(next)
  }, [next, setNetwork])

  return (
    <Space size={15} style={{ cursor: 'pointer' }} onClick={onSwitch}>
      <IonIcon className="action-center-icon " name="earth-outline" />
      <Typography.Text>Switch to {next}</Typography.Text>
    </Space>
  )
}

export default Network
