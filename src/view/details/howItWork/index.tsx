import { Col, Row, Typography, Collapse } from 'antd'

const HowItWork = () => {
  return (
    <Row gutter={[24, 24]}>
      <Col span={24}>
        <Typography.Title level={3}>How it work?</Typography.Title>
      </Col>

      <Col span={24}>
        <Row gutter={[12, 12]}>
          {[1, 2, 3].map((item, idx) => (
            <Col span={24} key={idx + item}>
              <Collapse className="mint-hiw">
                <Collapse.Panel header={`Mint ${item}`} key={item + idx}>
                  <Typography.Text>
                    Get KYLAN 1:1 with USD on homepage directly.
                  </Typography.Text>
                </Collapse.Panel>
              </Collapse>
            </Col>
          ))}
        </Row>
      </Col>
    </Row>
  )
}

export default HowItWork
