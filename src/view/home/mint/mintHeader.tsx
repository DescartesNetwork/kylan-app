import { Col, Row, Tooltip, Typography } from 'antd'
import useChequeBalance from 'hook/useChequeBalance'
import { numeric } from 'shared/util'

const MintHeader = () => {
  const { totalBalance } = useChequeBalance()

  return (
    <Row gutter={[16, 16]} align="middle">
      <Col flex="auto">
        <Typography.Text>Total value locked</Typography.Text>
      </Col>
      <Col>
        <Tooltip
          title={`$${totalBalance}`}
          placement="topLeft"
          arrowPointAtCenter
        >
          <Typography.Title level={3}>
            ${numeric(totalBalance).format('0,0.[000]a')}
          </Typography.Title>
        </Tooltip>
      </Col>
    </Row>
  )
}

export default MintHeader
