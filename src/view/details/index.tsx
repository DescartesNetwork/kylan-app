import { Col, Row } from 'antd'
import HowItWork from './howItWork'
import Mint from './mint'

const Details = () => {
  return (
    <Row gutter={[0, 120]}>
      <Col span={24}>
        <Mint />
      </Col>
      <Col span={24}>
        <HowItWork />
      </Col>
    </Row>
  )
}

export default Details
