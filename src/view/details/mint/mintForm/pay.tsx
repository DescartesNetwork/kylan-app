import { Col, Row } from 'antd'
import Amount from './amount'
import Infomations from './infomations'
import MintAction from './mintAction'

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
        <MintAction />
      </Col>
    </Row>
  )
}

export default Pay
