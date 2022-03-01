import { Col, Row } from 'antd'
import MintAction from '../mintAction'
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
        <MintAction />
      </Col>
    </Row>
  )
}

export default Pay
