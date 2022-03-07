import { useEffect } from 'react'
import { useHistory } from 'react-router-dom'

import { Col, Row } from 'antd'
import HowItWork from './howItWork'
import Mint from './mint'

import useAuth from 'hook/useAuth'

const Home = () => {
  const history = useHistory()
  const authenticated = useAuth()

  // Redirect callback
  useEffect(() => {
    const {
      location: { search },
    } = history
    const params = new URLSearchParams(search)
    let redirect = decodeURIComponent(params.get('redirect') || '/home')
    if (authenticated) history.push(redirect)
  }, [history, authenticated])

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
