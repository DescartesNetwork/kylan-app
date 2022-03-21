import { useHistory } from 'react-router-dom'

import { Col, Row, Image } from 'antd'
import Wallet from './wallet'
import ActionCenter from './actionCenter'
import Social from './social'

import { useUI } from 'providers'

import Logo from 'static/images/logo/logo.svg'
import MobileLogo from 'static/images/logo/logo-mobile.svg'
import { useSelector } from 'react-redux'
import { AppState } from 'store'
import { account } from '@senswap/sen-js'

const Header = () => {
  const history = useHistory()
  const {
    wallet: { address: walletAddress },
  } = useSelector((state: AppState) => state)
  const {
    ui: { infix },
  } = useUI()

  const logo = infix !== 'xs' ? Logo : MobileLogo
  const logoWidth = infix !== 'xs' ? {} : { width: 32 }

  return (
    <Row gutter={16} style={{ maxWidth: 1200, margin: 'auto' }}>
      <Col flex="auto">
        <Image
          src={logo}
          style={{ ...logoWidth, cursor: 'pointer' }}
          onClick={() => history.push('/home')}
          preview={false}
        />
      </Col>
      <Col>
        <Row gutter={[24, 24]} justify="end">
          <Col>
            <Social />
          </Col>
          <Col>
            {!account.isAddress(walletAddress) ? <Wallet /> : <ActionCenter />}
          </Col>
        </Row>
      </Col>
    </Row>
  )
}
export default Header
