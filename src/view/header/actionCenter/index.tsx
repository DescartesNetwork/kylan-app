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
      <Tooltip title={`Total: ${totalBalance} KUSD`}>
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
        <Button className="wallet-balance">
          <Tooltip title={`${utils.undecimalize(lamports, 9)} SOL`}>
            <Space>
              <WalletAvatar />
              <span>
                ◎ {numeric(utils.undecimalize(lamports, 9)).format('0,0.[00]a')}
              </span>
              {shortenAddress(walletAddress, 3, '...')}
            </Space>
          </Tooltip>
        </Button>
      </Popover>
    </Space>
  )
}

export default ActionCenter
