import { Col, Radio, Row } from 'antd'
import Pay from './pay'

const MintForm = () => {
  return (
    <Row gutter={[24, 24]} justify="center">
      <Col>
        <Radio.Group>
          <Radio.Button value="mint">Mint</Radio.Button>
          <Radio.Button value="pay-back">Payback</Radio.Button>
        </Radio.Group>
      </Col>
      <Col span={24}>
        <Pay />
      </Col>
    </Row>
  )
}
export default MintForm
