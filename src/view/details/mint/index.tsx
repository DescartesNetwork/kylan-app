import { Col, Row } from 'antd'
import PixelCard from 'components/ionicon/pixelCard'
import MintForm from './mintForm'
import MintHeader from './mintHeader'

const Mint = () => {
  return (
    <Row gutter={[16, 16]}>
      <Col span={24}>
        <PixelCard>
          <MintHeader />
        </PixelCard>
      </Col>
      <Col span={24}>
        <PixelCard>
          <MintForm />
        </PixelCard>
      </Col>
    </Row>
  )
}

export default Mint
