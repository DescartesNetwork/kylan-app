import { useDispatch, useSelector } from 'react-redux'

import { Row, Col, Button, Space, Popover, Typography } from 'antd'
import IonIcon from 'components/ionicon'
import WalletInfo from './walletInfo'
import Network from './network'

import { AppDispatch, AppState } from 'store'
import { shortenAddress } from 'shared/util'
import WalletAvatar from './walletAvatar'
import { disconnectWallet } from 'store/wallet.reducer'

import './index.less'

const ActionCenter = () => {
  const dispatch = useDispatch<AppDispatch>()
  const {
    wallet: { address: walletAddress },
  } = useSelector((state: AppState) => state)

  return (
    <Space>
      <Popover
        trigger="click"
        placement="bottomRight"
        title={<WalletInfo />}
        content={
          <Row gutter={[16, 16]} style={{ maxWidth: 194 }}>
            <Col span={24}>
              <Network />
            </Col>
            <Col span={24}>
              <Space
                size={15}
                style={{ cursor: 'pointer' }}
                onClick={() => dispatch(disconnectWallet())}
              >
                <IonIcon className="action-center-icon " name="power-outline" />
                <Typography.Text>Disconnect</Typography.Text>
              </Space>
            </Col>
          </Row>
        }
      >
        <Button style={{ fontWeight: 500, padding: '3px 12px' }} type="ghost">
          <Space size={16}>
            <Typography.Text>
              <Space>
                <WalletAvatar />
                {shortenAddress(walletAddress, 3, '...')}
              </Space>
            </Typography.Text>
            <IonIcon style={{ color: '#7A7B85' }} name="chevron-down-outline" />
          </Space>
        </Button>
      </Popover>
    </Space>
  )
}

export default ActionCenter
