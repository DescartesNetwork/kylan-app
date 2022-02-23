import { Col, Row } from 'antd'
import Certificate from './certificate'
import OverView from './overView'

const Admin = () => {
  return (
    <Row gutter={[24, 24]}>
      <Col span={24}>
        <OverView />
      </Col>
      <Col span={24}>
        <Certificate />
      </Col>
    </Row>
  )
}

export default Admin
