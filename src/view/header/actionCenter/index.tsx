import { useCallback, useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { account, utils } from '@senswap/sen-js'
import { useSolana } from '@gokiprotocol/walletkit'

import { Row, Col, Button, Space, Popover, Typography, Avatar } from 'antd'
import IonIcon from 'components/ionicon'
import Network from './network'
import WalletAvatar from './walletAvatar'

import { AppState, AppDispatch } from 'store'
import { disconnectWallet } from 'store/wallet.reducer'
import { numeric, shortenAddress } from 'shared/util'
import configs from 'configs'

import logo from 'static/images/logo/logo-mobile.svg'
import './index.less'

const {
  sol: { printerAddress },
} = configs

const ActionCenter = () => {
  const dispatch = useDispatch<AppDispatch>()
  const {
    main: { mintSelected },
    wallet: { lamports, address: walletAddress },
  } = useSelector((state: AppState) => state)
  const [kylanBalance, setKylanBalance] = useState(0)
  const { disconnect } = useSolana()

  const onDisconnectWallet = useCallback(async () => {
    await disconnect()
    await dispatch(disconnectWallet())
  }, [disconnect, dispatch])

  const getKylanBalance = useCallback(async () => {
    const { kylan } = window.kylan
    if (!account.isAddress(mintSelected)) return
    try {
      const chequeAddress = await kylan.deriveChequeAddress(
        printerAddress,
        mintSelected,
      )
      const { amount } = await kylan.getChequeData(chequeAddress)
      const balance = amount.toNumber() / Math.pow(10, 6)
      setKylanBalance(balance)
    } catch (err: any) {
      setKylanBalance(0)
    }
  }, [mintSelected])

  useEffect(() => {
    getKylanBalance()
  }, [getKylanBalance])

  return (
    <Space className="wallet-center">
      <Space className="kylan-balance" size={12}>
        <Avatar size={24} src={logo} />
        <Typography.Text>{kylanBalance}</Typography.Text>
      </Space>
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
                onClick={onDisconnectWallet}
              >
                <IonIcon className="action-center-icon " name="power-outline" />
                <Typography.Text>Disconnect</Typography.Text>
              </Space>
            </Col>
          </Row>
        }
      >
        <Button className="wallet-balance">
          <Space>
            <WalletAvatar />
            <span>
              ◎ {numeric(utils.undecimalize(lamports, 9)).format('0,0.[00]a')}
            </span>
            {shortenAddress(walletAddress, 3, '...')}
          </Space>
        </Button>
      </Popover>
    </Space>
  )
}

export default ActionCenter
