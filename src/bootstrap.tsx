import { Fragment } from 'react'
import { render } from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import {
  AccountProvider,
  MintProvider,
  UIProvider,
  WalletProvider,
} from 'providers'
import { WalletKitProvider } from '@gokiprotocol/walletkit'

import { ConfigProvider } from 'antd'
import View from 'view/app'

import store from 'store'
import reportWebVitals from 'reportWebVitals'

import 'static/styles/index.less'

const APP_CONFIG = {
  name: 'kylan_app',
  icon: <Fragment />,
}

render(
  <Provider store={store}>
    <UIProvider>
      <BrowserRouter>
        <ConfigProvider prefixCls={'kylan'}>
          <WalletProvider>
            <AccountProvider>
              <MintProvider>
                <WalletKitProvider app={APP_CONFIG}>
                  <View />
                </WalletKitProvider>
              </MintProvider>
            </AccountProvider>
          </WalletProvider>
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
