import { Row, Col, Typography } from 'antd'
import PixelCard from 'components/pixelCard'

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
          <Row gutter={[24, 24]}>
            <Col span={24}>
              <Row>
                <Col flex="auto">
                  <Typography.Text>Total token printed</Typography.Text>
                </Col>
                <Col>$190.5</Col>
              </Row>
            </Col>
          </Row>
        </PixelCard>
      </Col>
    </Row>
  )
}
export default OverView
