import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { account } from '@senswap/sen-js'

import { Col, Row } from 'antd'
import HowItWork from './howItWork'
import Mint from './mint'

import { AppState } from 'store'

const Home = () => {
  const history = useHistory()
  const {
    wallet: { address: walletAddress },
  } = useSelector((state: AppState) => state)

  // Redirect callback
  useEffect(() => {
    const {
      location: { search },
    } = history
    const params = new URLSearchParams(search)
    const redirect = decodeURIComponent(params.get('redirect') || '/home')
    if (account.isAddress(walletAddress)) history.push(redirect)
  }, [walletAddress, history])

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
