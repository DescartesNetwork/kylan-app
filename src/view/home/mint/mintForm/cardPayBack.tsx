import { Avatar, Card, Col, Image, Row, Space, Typography } from 'antd'
import MintSelection from './mintSelection'

import { useUI } from 'providers'
import IconArrow from 'static/images/icon-arrow.svg'
import KylanIcon from 'static/images/logo/logo-mobile.svg'

const Mint = ({ floatRight = false }: { floatRight?: boolean }) => {
  const {
    ui: { infix },
  } = useUI()

  const float = floatRight && infix !== 'xs' ? 'end' : 'start'
  const label = floatRight ? 'Receive' : 'Pay'

  return (
    <Card bordered={false} style={{ textAlign: float, height: '100%' }}>
      <Space direction="vertical" align={float}>
        <Typography.Text type="secondary">{label}</Typography.Text>
        <MintSelection />
      </Space>
    </Card>
  )
}

const Payback = ({ floatRight = false }: { floatRight?: boolean }) => {
  const {
    ui: { infix },
  } = useUI()

  const float = floatRight && infix !== 'xs' ? 'end' : 'start'
  const label = floatRight ? 'Receive' : 'Pay'

  return (
    <Card bordered={false} style={{ textAlign: float }}>
      <Space direction="vertical" align={float}>
        <Typography.Text type="secondary">{label}</Typography.Text>
        <Space style={{ minHeight: 30 }} align="center">
          <Avatar src={KylanIcon} size={24} />
          <Typography.Text>KUSD</Typography.Text>
        </Space>
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
