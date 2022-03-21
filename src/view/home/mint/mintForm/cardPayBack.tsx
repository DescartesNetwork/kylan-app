import { Avatar, Card, Col, Image, Row, Space, Tooltip, Typography } from 'antd'
import MintSelection from './mintSelection'

import { useUI } from 'providers'
import IconArrow from 'static/images/icon-arrow.svg'
import KylanIcon from 'static/images/icon-kylan.svg'
import { useSelector } from 'react-redux'
import { AppState } from 'store'
import useEstReceived from 'hook/useEstReceived'
import { numeric } from 'shared/util'

const Mint = ({ floatRight = false }: { floatRight?: boolean }) => {
  const {
    bid: { bidAmount },
  } = useSelector((state: AppState) => state)
  const {
    ui: { infix },
  } = useUI()
  const received = useEstReceived()

  const float = floatRight && infix !== 'xs' ? 'end' : 'start'
  const label = floatRight ? 'Receive' : 'Deposit'
  const value = floatRight ? received : bidAmount || 0

  return (
    <Card bordered={false} style={{ textAlign: float, height: '100%' }}>
      <Space direction="vertical" align={float}>
        <Typography.Text type="secondary">{label}</Typography.Text>
        <MintSelection />
        <Tooltip title={value} placement="topRight" arrowPointAtCenter>
          <Typography.Title level={4}>
            {numeric(value).format('0,0.[0000]a')}
          </Typography.Title>
        </Tooltip>
      </Space>
    </Card>
  )
}

const Payback = ({ floatRight = false }: { floatRight?: boolean }) => {
  const {
    bid: { bidAmount },
  } = useSelector((state: AppState) => state)
  const {
    ui: { infix },
  } = useUI()
  const received = useEstReceived()

  const float = floatRight && infix !== 'xs' ? 'end' : 'start'
  const label = floatRight ? 'Receive' : 'Redeem'
  const value = floatRight ? received : bidAmount

  return (
    <Card bordered={false} style={{ textAlign: float }}>
      <Space direction="vertical" align={float}>
        <Typography.Text type="secondary">{label}</Typography.Text>
        <Space style={{ minHeight: 30 }} align="center">
          <Avatar src={KylanIcon} size={24} />
          <Typography.Text style={{ fontSize: 16 }}>KUSD</Typography.Text>
        </Space>
        <Tooltip title={value} placement="topRight" arrowPointAtCenter>
          <Typography.Title level={4}>
            {numeric(value).format('0,0.[0000]a')}
          </Typography.Title>
        </Tooltip>
      </Space>
    </Card>
  )
}

const CardPayBack = ({ payback = false }: { payback?: boolean }) => {
  if (payback)
    return (
      <Row gutter={[4, 4]}>
        <Col xs={24} sm={12}>
          <Payback />
        </Col>
        <Col span={0} className="pay-icon">
          <Image src={IconArrow} preview={false} />
        </Col>
        <Col xs={24} sm={12}>
          <Mint floatRight />
        </Col>
      </Row>
    )
  return (
    <Row gutter={[4, 4]}>
      <Col xs={24} sm={12}>
        <Mint />
      </Col>
      <Col span={0} className="pay-icon">
        <Image src={IconArrow} preview={false} />
      </Col>
      <Col xs={24} sm={12}>
        <Payback floatRight />
      </Col>
    </Row>
  )
}
export default CardPayBack
