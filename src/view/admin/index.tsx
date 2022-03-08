import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import { Col, Row } from 'antd'
import Certificate from './certificate'
import OverView from './overView'

import { getCheques } from 'store/cheque.reducer'
import { updateRole } from 'store/main.reducer'
import { Role } from 'constant'

const Admin = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(updateRole(Role.admin))
    dispatch(getCheques())
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
