import { Col, Row, Tooltip, Typography } from 'antd'
import usePrinterBalance from 'hook/usePrinterBalance'
import { numeric } from 'shared/util'

const MintHeader = () => {
  const { printerTVL } = usePrinterBalance()
  return (
    <Row gutter={[16, 16]} align="middle">
      <Col flex="auto">
        <Typography.Text>Total value locked</Typography.Text>
      </Col>
      <Col>
        <Tooltip title={printerTVL} placement="topLeft" arrowPointAtCenter>
          <Typography.Title level={3}>
            ${numeric(printerTVL).format('0,0.[000]a')}
          </Typography.Title>
        </Tooltip>
      </Col>
    </Row>
  )
}

export default MintHeader
