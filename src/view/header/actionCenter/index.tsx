import { ChangeEvent, useCallback, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { account, utils } from '@senswap/sen-js'
import { useSolana } from '@gokiprotocol/walletkit'
import { useLocation } from 'react-router-dom'

import {
  Row,
  Col,
  Button,
  Space,
  Popover,
  Typography,
  Avatar,
  Tooltip,
  Modal,
  Input,
} from 'antd'
import IonIcon from 'components/ionicon'
import Network from './network'
import WalletAvatar from './walletAvatar'
import PixelCard from 'components/pixelCard'
import PixelButton from 'components/pixelButton'

import { AppState, AppDispatch } from 'store'
import { disconnectWallet } from 'store/wallet.reducer'
import { explorer, numeric, shortenAddress } from 'shared/util'
import useChequeBalance from 'hook/useChequeBalance'
import configs from 'configs'

import logo from 'static/images/logo/logo-mobile.svg'
import './index.less'

const {
  sol: { printerAddress },
} = configs

const ActionCenter = () => {
  const [visible, setVisible] = useState(false)
  const [newAuthority, setNewAuthority] = useState('')
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch<AppDispatch>()
  const {
    wallet: { lamports, address: walletAddress },
  } = useSelector((state: AppState) => state)
  const history = useHistory()
  const { disconnect } = useSolana()
  const { totalBalance } = useChequeBalance()
  const { pathname } = useLocation()

  const onDisconnectWallet = useCallback(async () => {
    await disconnect()
    await dispatch(disconnectWallet())
  }, [disconnect, dispatch])

  const transferPrinterOwner = useCallback(async () => {
    if (!account.isAddress(newAuthority)) return
    setLoading(true)
    try {
      const { kylan } = window.kylan
      const { txId } = await kylan.transferAuthority(
        newAuthority,
        printerAddress,
      )
      window.notify({
        type: 'success',
        description:
          'Transfer new authority successfully. Click to view details.',
        onClick: () => window.open(explorer(txId), '_blank'),
      })
    } catch (err: any) {
      window.notify({ type: 'error', description: err.message })
    } finally {
      setLoading(false)
    }
  }, [newAuthority])

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
                <IonIcon className="action-center-icon" name="power-outline" />
                <Typography.Text>Disconnect</Typography.Text>
              </Space>
            </Col>
            {pathname === '/admin' ? (
              <Col span={24}>
                <Space
                  size={15}
                  onClick={() => setVisible(true)}
                  style={{ cursor: 'pointer' }}
                >
                  <IonIcon
                    className="action-center-icon "
                    name="git-compare-outline"
                  />
                  <Typography.Text>Transfer printer Owner</Typography.Text>
                </Space>
              </Col>
            ) : null}
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
      <Modal
        footer={null}
        closeIcon={<IonIcon name="close-outline" />}
        onCancel={() => setVisible(false)}
        visible={visible}
        className="pixel-modal"
        bodyStyle={{ padding: 0 }}
        centered
      >
        <PixelCard>
          <Row gutter={[24, 24]}>
            <Col span={24}>
              <Typography.Title level={5}>
                Transfer Printer Authority
              </Typography.Title>
            </Col>
            <Col span={24}>
              <Input
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setNewAuthority(e.target.value)
                }
                placeholder="wallet address"
              />
            </Col>
            <Col span={24}>
              <PixelButton
                loading={loading}
                onClick={transferPrinterOwner}
                block
              >
                Confirm
              </PixelButton>
            </Col>
          </Row>
        </PixelCard>
      </Modal>
    </Space>
  )
}

export default ActionCenter
