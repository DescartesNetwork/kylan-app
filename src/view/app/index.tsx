import { Switch, Route, Redirect } from 'react-router-dom'

import { Affix, Card, Layout } from 'antd'
import Header from 'view/header'
import Home from 'view/home'
import Watcher from 'watcher'
import PrivateRoute from 'components/privateRoute'
import Admin from 'view/admin'
import NewPrinter from 'view/newPrinter'

const App = () => {
  return (
    <Layout className="root-bg">
      <Affix>
        <Card
          style={{
            zIndex: 999,
            boxShadow: 'unset',
            background: '#37bcf9',
          }}
          bodyStyle={{ padding: 20 }}
          bordered={false}
        >
          <Header />
        </Card>
      </Affix>
      <Layout style={{ padding: '72px 16px 16px' }}>
        <Switch>
          <Route exact path="/home" component={Home} />
          <PrivateRoute exact path="/admin" component={Admin} />
          <PrivateRoute
            exact
            path="/admin/new-printer"
            component={NewPrinter}
          />
          <Redirect exact from="*" to="/home" />
        </Switch>
      </Layout>
      <Watcher />
    </Layout>
  )
}

export default App
