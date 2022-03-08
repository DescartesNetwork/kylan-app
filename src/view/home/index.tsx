import { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import { Col, Row } from 'antd'
import HowItWork from './howItWork'
import Mint from './mint'

import useAuth from 'hook/useAuth'
import { getPrinter } from 'store/printer.reducer'
import { updateRole } from 'store/main.reducer'
import { Role } from 'constant'

const Home = () => {
  const history = useHistory()
  const authenticated = useAuth()
  const dispatch = useDispatch()

  // Redirect callback
  useEffect(() => {
    const {
      location: { search },
    } = history
    const params = new URLSearchParams(search)
    let redirect = decodeURIComponent(params.get('redirect') || '/home')
    if (authenticated) history.push(redirect)
  }, [history, authenticated])

  useEffect(() => {
    dispatch(updateRole(Role.user))
    dispatch(getPrinter())
  }, [dispatch])

  return (
    <Row gutter={16} justify="center">
      <Col xs={24} md={16} lg={12} xl={8}>
        <Row gutter={[0, 120]}>
          <Col span={24}>
            <Mint />
          </Col>
          <Col span={24}>
            <HowItWork />
          </Col>
        </Row>
      </Col>
    </Row>
  )
}

export default Home
