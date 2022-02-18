import { Avatar, Card, Col, Row, Select, Space, Typography, Image } from 'antd'

import IconArrow from 'static/images/icon-arrow.svg'

const RowContent = ({
  label = '',
  value = '',
}: {
  label?: string
  value?: string
}) => {
  return (
    <Row gutter={[16, 16]}>
      <Col flex="auto">
        <Typography.Text type="secondary">{label}</Typography.Text>
      </Col>
      <Col>
        <Typography.Text>{value}</Typography.Text>
      </Col>
    </Row>
  )
}

const Infomations = () => {
  return (
    <Row gutter={[24, 24]}>
      <Col span={24}>
        <Card bordered={false} bodyStyle={{ padding: '0 24px' }}>
          <Row justify="space-between">
            <Col style={{ padding: '24px 0' }}>
              <Space direction="vertical">
                <Typography.Text type="secondary">Pay</Typography.Text>
                <Select className="pay-select" bordered={false}>
                  <Select.Option>
                    <Space align="center">
                      <Avatar.Group>
                        <Avatar size={24} />
                        <Avatar size={24} />
                      </Avatar.Group>
                      <Typography.Text>USDC/SNTR</Typography.Text>
                    </Space>
                  </Select.Option>
                </Select>
              </Space>
            </Col>
            <Col className="pay-icon">
              <Image src={IconArrow} preview={false} />
            </Col>
            <Col style={{ padding: '24px 0' }}>
              <Space direction="vertical" align="end">
                <Typography.Text type="secondary">Receive</Typography.Text>
                <Space style={{ minHeight: 30 }} align="center">
                  <Avatar size={24} />
                  <Typography.Text>KYLAN</Typography.Text>
                </Space>
              </Space>
            </Col>
          </Row>
        </Card>
      </Col>
      <Col span={24}>
        <Row gutter={[10, 10]}>
          <Col span={24}>
            <RowContent label="Exchange rate" value="1KYLAN = 0.98 USDC/SNTR" />
          </Col>
          <Col span={24}>
            <RowContent label="Exchange rate" value="1KYLAN = 0.98 USDC/SNTR" />
          </Col>
          <Col span={24}>
            <RowContent label="Exchange rate" value="1KYLAN = 0.98 USDC/SNTR" />
          </Col>
        </Row>
      </Col>
    </Row>
  )
}

export default Infomations
