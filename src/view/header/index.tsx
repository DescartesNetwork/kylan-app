import { useSelector } from 'react-redux'
import { account } from '@senswap/sen-js'

import { Col, Row, Image } from 'antd'
import { AppState } from 'store'

import Logo from 'static/images/logo.svg'
import Wallet from './wallet'
import ActionCenter from './actionCenter'
import Social from './social'

const Header = () => {
  const {
    wallet: { address: walletAddress },
  } = useSelector((state: AppState) => state)
  return (
    <Row gutter={16}>
      <Col flex="auto">
        <Image src={Logo} preview={false} />
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
