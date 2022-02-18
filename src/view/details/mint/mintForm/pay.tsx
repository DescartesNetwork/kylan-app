import { Button, Col, Row } from 'antd'
import Amount from './amount'
import Infomations from './infomations'

const Pay = () => {
  return (
    <Row gutter={[24, 24]}>
      <Col span={24}>
        <Amount />
      </Col>
      <Col span={24}>
        <Infomations />
      </Col>
      <Col span={24}>
        <Button block>Connect wallet</Button>
      </Col>
    </Row>
  )
}

export default Pay
