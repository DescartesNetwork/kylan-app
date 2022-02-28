import { Avatar, Col, Row, Space, Typography } from 'antd'
import IonIcon from 'components/ionicon'

const MintHeader = () => {
  return (
    <Row gutter={[16, 16]}>
      <Col flex="auto">
        <Typography.Text type="secondary">Support by</Typography.Text>
      </Col>
      <Col>
        <Space size={8}>
          <Typography.Text>Sentre</Typography.Text>
          <Avatar size={24} />
          <IonIcon name="add-outline" />
          <Avatar size={24} />
          <Typography.Text>Coin 98</Typography.Text>
        </Space>
      </Col>
    </Row>
  )
}

export default MintHeader
