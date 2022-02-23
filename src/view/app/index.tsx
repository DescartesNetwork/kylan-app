import { Switch, Route, Redirect } from 'react-router-dom'

import { Affix, Card, Col, Layout, Row } from 'antd'
import Header from 'view/header'
import Details from 'view/details'
import Watcher from 'watcher'
import PrivateRoute from 'components/privateRoute'
import Admin from 'view/admin'

const MintDetails = () => {
  return (
    <Row gutter={16} justify="center">
      <Col xs={24} lg={16} xl={8}>
        <Details />
      </Col>
    </Row>
  )
}

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
      <Layout style={{ padding: '72px 16px 16px' }}>
        <Switch>
          <Route exact path="/" component={MintDetails} />
          <PrivateRoute exact path="/stable-admin" component={Admin} />
          <Redirect exact from="*" to="/" />
        </Switch>
      </Layout>
      <Watcher />
    </Layout>
  )
}

export default App
