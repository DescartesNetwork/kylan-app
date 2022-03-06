import { useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { utils } from '@senswap/sen-js'
import { useSolana } from '@gokiprotocol/walletkit'

import {
  Row,
  Col,
  Button,
  Space,
  Popover,
  Typography,
  Avatar,
  Tooltip,
} from 'antd'
import IonIcon from 'components/ionicon'
import Network from './network'
import WalletAvatar from './walletAvatar'

import { AppState, AppDispatch } from 'store'
import { disconnectWallet } from 'store/wallet.reducer'
import { numeric, shortenAddress } from 'shared/util'

import logo from 'static/images/logo/logo-mobile.svg'
import './index.less'
import useChequeBalance from 'hook/useChequeBalance'

const ActionCenter = () => {
  const dispatch = useDispatch<AppDispatch>()
  const {
    wallet: { lamports, address: walletAddress },
  } = useSelector((state: AppState) => state)
  const history = useHistory()
  const { disconnect } = useSolana()
  const { totalBalance } = useChequeBalance()

  const onDisconnectWallet = useCallback(async () => {
    await disconnect()
    await dispatch(disconnectWallet())
  }, [disconnect, dispatch])

  return (
    <Space className="wallet-center">
      <Tooltip placement="bottom" title={`Total: ${totalBalance} KUSD`}>
        <Space className="kylan-balance" size={12}>
          <Avatar size={24} src={logo} />
          <Typography.Text>
            {numeric(totalBalance).format('0,0.[000]a')}
          </Typography.Text>
        </Space>
      </Tooltip>
      <Popover
        trigger="click"
        placement="bottomRight"
        content={
          <Row gutter={[16, 16]} style={{ maxWidth: 194 }}>
            <Col span={24}>
              <Network />
            </Col>
            <Col span={24}>
              <Space
                size={15}
                style={{ cursor: 'pointer' }}
                onClick={async () => {
                  onDisconnectWallet()
                  history.push('/home')
                }}
              >
                <IonIcon className="action-center-icon " name="power-outline" />
                <Typography.Text>Disconnect</Typography.Text>
              </Space>
            </Col>
          </Row>
        }
      >
        <Space className="wallet-balance">
          <Tooltip
            placement="bottom"
            title={`${utils.undecimalize(lamports, 9)} SOL`}
          >
            <Space onClick={(e) => e.stopPropagation()}>
              <WalletAvatar />
              <span>
                ◎ {numeric(utils.undecimalize(lamports, 9)).format('0,0.[00]a')}
              </span>
            </Space>
          </Tooltip>
          <Button>{shortenAddress(walletAddress, 3, '...')}</Button>
        </Space>
      </Popover>
    </Space>
  )
}

export default ActionCenter
