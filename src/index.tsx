import { render } from 'react-dom'
import { HashRouter } from 'react-router-dom'
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
import IonIcon from 'components/ionicon'
import store from 'store'
import reportWebVitals from 'reportWebVitals'

import logoKylan from 'static/images/logo/logo-mobile.svg'
import 'static/styles/index.less'

const APP_CONFIG = {
  name: 'project-kylan',
  icon: <IonIcon src={logoKylan} />,
}

render(
  <Provider store={store}>
    <UIProvider>
      <HashRouter>
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
      </HashRouter>
    </UIProvider>
  </Provider>,
  document.getElementById('root'),
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
