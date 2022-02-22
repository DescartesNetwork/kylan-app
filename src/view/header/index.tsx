import { useSolana } from '@gokiprotocol/walletkit'

import { Col, Row, Image } from 'antd'
import Wallet from './wallet'
import ActionCenter from './actionCenter'
import Social from './social'

import Logo from 'static/images/logo/logo.svg'
import MobileLogo from 'static/images/logo/logo-mobile.svg'
import { useUI } from 'providers'

const Header = () => {
  const { connected } = useSolana()
  const {
    ui: { infix },
  } = useUI()

  const logo = infix !== 'xs' ? Logo : MobileLogo

  return (
    <Row gutter={16} style={{ maxWidth: 1200, margin: 'auto' }}>
      <Col flex="auto">
        <Image src={logo} preview={false} />
      </Col>
      <Col>
        <Row gutter={[24, 24]} justify="end">
          <Col>
            <Social />
          </Col>
          <Col>{!connected ? <Wallet /> : <ActionCenter />}</Col>
        </Row>
      </Col>
    </Row>
  )
}
export default Header
