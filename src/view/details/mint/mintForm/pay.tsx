import { Col, Row } from 'antd'
import IonIcon from 'components/ionicon'
import PixelButton from 'components/pixelButton'
import Amount from './amount'
import Infomations from './infomations'

const Pay = () => {
  return (
    <Row gutter={[24, 24]}>
      <Col span={24}>
        <Amount />
      </Col>
      <Col span={24}>
        <Infomations />
      </Col>
      <Col span={24}>
        <PixelButton suffix={<IonIcon name="wallet-outline" />} block>
          Connect wallet
        </PixelButton>
      </Col>
    </Row>
  )
}

export default Pay
