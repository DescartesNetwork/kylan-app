import { Col, Row } from 'antd'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { getCheques } from 'store/cheque.reducer'
import { getPrinterData } from 'store/printer.reducer'
import Certificate from './certificate'
import OverView from './overView'

const Admin = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getCheques(true))
    dispatch(getPrinterData())
  }, [dispatch])

  return (
    <Row gutter={[24, 24]} style={{ maxWidth: 1200, margin: 'auto' }}>
      <Col span={24}>
        <OverView />
      </Col>
      <Col span={24}>
        <Certificate />
      </Col>
    </Row>
  )
}

export default Admin
