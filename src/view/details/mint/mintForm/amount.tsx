import { Button, Card, Col, Row, Typography } from 'antd'
import NumericInput from 'shared/antd/numericInput'

const Amount = () => {
  return (
    <Card
      bordered={false}
      style={{ background: '#E0E1EE' }}
      bodyStyle={{ padding: '12px 16px' }}
    >
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Typography.Text type="secondary">Amount</Typography.Text>
        </Col>
        <Col span={24}>
          <NumericInput
            className="mint-amount"
            bordered={false}
            suffix={
              <Button onClick={() => {}}>
                <Typography.Title level={5}>Max</Typography.Title>
              </Button>
            }
          />
        </Col>
      </Row>
    </Card>
  )
}

export default Amount
