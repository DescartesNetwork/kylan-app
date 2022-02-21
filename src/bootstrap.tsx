import { render } from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { UIProvider } from 'providers'

import { ConfigProvider } from 'antd'
import View from 'view/app'

import store from 'store'
import reportWebVitals from 'reportWebVitals'

import 'static/styles/index.less'

render(
  <Provider store={store}>
    <UIProvider>
      <BrowserRouter>
        <ConfigProvider prefixCls={'kylan'}>
          <View />
        </ConfigProvider>
      </BrowserRouter>
    </UIProvider>
  </Provider>,
  document.getElementById('root'),
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
