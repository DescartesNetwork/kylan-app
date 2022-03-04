import { useDispatch } from 'react-redux'

import { Col, Radio, RadioChangeEvent, Row } from 'antd'
import Pay from './pay'

import { PayState } from 'constant'
import { AppDispatch } from 'store'
import { setPrinterType } from 'store/main.reducer'

const MintForm = () => {
  const dispatch = useDispatch<AppDispatch>()

  const handleChange = (e: RadioChangeEvent) => {
    dispatch(setPrinterType(e.target.value))
  }

  return (
    <Row gutter={[24, 24]} justify="center">
      <Col>
        <Radio.Group
          onChange={handleChange}
          defaultValue={PayState.Mint}
          className="pay-button"
        >
          <Radio.Button style={{ minWidth: 90 }} value={PayState.Mint}>
            Mint
          </Radio.Button>
          <Radio.Button style={{ minWidth: 90 }} value={PayState.Payback}>
            Payback
          </Radio.Button>
        </Radio.Group>
      </Col>
      <Col span={24}>
        <Pay />
      </Col>
    </Row>
  )
}
export default MintForm
