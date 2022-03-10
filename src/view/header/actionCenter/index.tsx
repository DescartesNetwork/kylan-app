import { ChangeEvent, useCallback, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { account, utils } from '@senswap/sen-js'
import { useSolana } from '@gokiprotocol/walletkit'

import {
  Row,
  Col,
  Button,
  Space,
  Popover,
  Typography,
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
import { Role } from 'constant'
import { disconnectWallet } from 'store/wallet.reducer'
import { explorer, numeric, shortenAddress } from 'shared/util'
import configs from 'configs'

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
    main: { role },
    printer: { authority },
  } = useSelector((state: AppState) => state)
  const history = useHistory()
  const { disconnect } = useSolana()

  const transferable = role === Role.admin && authority === walletAddress

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
      return history.push('./home')
    } catch (err: any) {
      window.notify({ type: 'error', description: err.message })
    } finally {
      setLoading(false)
      setVisible(false)
    }
  }, [history, newAuthority])

  return (
    <Space className="wallet-center">
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
            {transferable ? (
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
                  <Typography.Text>Transfer Authority</Typography.Text>
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
              <Typography.Title level={5}>Transfer Authority</Typography.Title>
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
