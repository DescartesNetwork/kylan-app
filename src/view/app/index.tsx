import { Affix, Card, Col, Layout, Row } from 'antd'
import Header from 'view/header'
import Details from 'view/details'

const App = () => {
  return (
    <Layout className="root-bg">
      <Affix>
        <Card
          style={{
            zIndex: 999,
            boxShadow: 'unset',
            background: 'transparent',
          }}
          bodyStyle={{ padding: 20 }}
          bordered={false}
        >
          <Header />
        </Card>
      </Affix>
      <Layout>
        <Row gutter={16} justify="center">
          <Col span={8}>
            <Details />
          </Col>
        </Row>
      </Layout>
    </Layout>
  )
}

export default App
