import { Card, Col, Image, Row, Space, Typography } from 'antd'
import { MintAvatar, MintSymbol } from 'shared/antd/mint'
import MintSelection from './mintSelection'
import IconArrow from 'static/images/icon-arrow.svg'
import { useUI } from 'providers'

const Mint = ({ floatRight = false }: { floatRight?: boolean }) => {
  const {
    ui: { infix },
  } = useUI()

  const float = floatRight && infix !== 'xs' ? 'end' : 'start'
  const label = floatRight ? 'Receive' : 'Pay'

  return (
    <Card bordered={false} style={{ textAlign: float }}>
      <Space direction="vertical" align={float}>
        <Typography.Text type="secondary">{label}</Typography.Text>
        <MintSelection />
      </Space>
    </Card>
  )
}

const Payback = ({
  mintAddress,
  floatRight = false,
}: {
  mintAddress: string
  floatRight?: boolean
}) => {
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
          <MintAvatar mintAddress={mintAddress} />
          <MintSymbol mintAddress={mintAddress} />
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
          <Payback mintAddress={''} />
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
        <Payback mintAddress={''} floatRight />
      </Col>
    </Row>
  )
}
export default CardPayBack
