import { Col, Row, Typography, Collapse } from 'antd'

import { HOW_IT_WORK } from './base'

const HowItWork = () => {
  return (
    <Row gutter={[24, 24]}>
      <Col span={24}>
        <Typography.Title level={3}>How it work?</Typography.Title>
      </Col>

      <Col span={24}>
        <Row gutter={[12, 12]}>
          {HOW_IT_WORK.map(({ title, description }, idx) => (
            <Col span={24} key={idx}>
              <Collapse className="mint-hiw">
                <Collapse.Panel
                  header={
                    <Typography.Title level={5}>{title}</Typography.Title>
                  }
                  key={idx}
                >
                  <Typography.Text>{description}</Typography.Text>
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
