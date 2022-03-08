import { Avatar, Col, Row, Space, Typography, Image } from 'antd'

import logoSentre from 'static/images/logo/sentre.svg'
import logoCoin98 from 'static/images/logo/coin98.svg'
import iconHandsack from 'static/images/icon-handsack.svg'

const MintHeader = () => {
  return (
    <Row gutter={[16, 16]}>
      <Col flex="auto">
        <Typography.Text type="secondary">Powered by</Typography.Text>
      </Col>
      <Col>
        <Space size={8}>
          <Typography.Text>Sentre</Typography.Text>
          <Avatar src={logoSentre} size={24} />
          <Image src={iconHandsack} preview={false} />
          <Avatar src={logoCoin98} size={24} />
          <Typography.Text>Coin98</Typography.Text>
        </Space>
      </Col>
    </Row>
  )
}

export default MintHeader
