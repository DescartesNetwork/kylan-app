import { useCallback, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useSolana } from '@saberhq/use-solana'

import { Col, Row } from 'antd'
import Certificate from './certificate'
import OverView from './overView'

import usePrinterData from 'hook/usePrinterData'
import configs from 'configs'

const {
  admin: { adminAddresses },
} = configs

const Admin = () => {
  const { authority } = usePrinterData()
  const { publicKey } = useSolana()
  const walletAddress = publicKey?.toBase58() || ''
  const history = useHistory()

  const checkRole = useCallback(() => {
    const pathname = encodeURIComponent(
      window.location.href.replace(window.location.origin, ''),
    )
    if (!authority) return
    if (
      authority !== walletAddress &&
      !adminAddresses.includes(walletAddress)
    ) {
      return history.push('/home?redirect=' + pathname)
    }
  }, [authority, history, walletAddress])

  useEffect(() => {
    checkRole()
  }, [checkRole])

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
