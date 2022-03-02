import { Row, Col, Typography } from 'antd'
import PixelCard from 'components/pixelCard'
import TotalTokenPrinted from './totalTokenPrinted'

const OverView = () => {
  return (
    <Row gutter={[16, 16]}>
      <Col span={24}>
        <Typography.Title level={5}>Overview</Typography.Title>
      </Col>
      <Col xs={24} md={12}>
        <PixelCard>
          <Typography.Text type="secondary">Comming soon</Typography.Text>
        </PixelCard>
      </Col>
      <Col xs={24} md={12}>
        <PixelCard>
          <TotalTokenPrinted />
        </PixelCard>
      </Col>
    </Row>
  )
}
export default OverView
