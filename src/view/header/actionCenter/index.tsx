import { useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { account, utils } from '@senswap/sen-js'
import { useSolana } from '@gokiprotocol/walletkit'

import { Row, Col, Button, Space, Popover, Typography, Avatar } from 'antd'
import IonIcon from 'components/ionicon'
import Network from './network'
import WalletAvatar from './walletAvatar'

import { AppState } from 'store'
import { numeric, shortenAddress } from 'shared/util'
import useKylan from 'hook/useKylan'
import configs from 'configs'

import logo from 'static/images/logo/logo-mobile.svg'
import './index.less'

const {
  sol: { printerAddress },
} = configs

const ActionCenter = () => {
  const {
    main: { mintSelected },
  } = useSelector((state: AppState) => state)
  const [lamports, setLamports] = useState('0')
  const [kylanBalance, setKylanBalance] = useState(0)
  const { disconnect, publicKey, provider } = useSolana()
  const walletAddress = publicKey?.toBase58() || ''
  const kylan = useKylan()

  const getKylanBalance = useCallback(async () => {
    if (!kylan || !account.isAddress(mintSelected)) return
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
  }, [kylan, mintSelected])

  const getLamports = useCallback(async () => {
    if (!publicKey) return
    const balance = await provider.connection.getBalance(publicKey)
    const lamports = utils.undecimalize(BigInt(balance), 9)
    setLamports(lamports)
  }, [provider.connection, publicKey])

  useEffect(() => {
    getLamports()
  }, [getLamports])

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
                onClick={disconnect}
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
            <span>${numeric(lamports).format('0,0.[00]a')}</span>
            {shortenAddress(walletAddress, 3, '...')}
          </Space>
        </Button>
      </Popover>
    </Space>
  )
}

export default ActionCenter
