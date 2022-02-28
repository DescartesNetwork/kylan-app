import { useCallback, useEffect, useState } from 'react'

import { Button, Col, Row, Space, Typography } from 'antd'
import IonIcon from 'components/ionicon'
import CertificateCard from './certificateCard'
import NewCertificate from './newCeritificate'

import configs from 'configs'
import { useAccount } from 'providers'

const {
  sol: { printerAddress },
} = configs

const Certificate = () => {
  const [visible, setVisible] = useState(false)
  const [certAddress, setCertAddress] = useState<string[]>()
  const { accounts } = useAccount()

  const getCertAddress = useCallback(async () => {
    const { kylan } = window.kylan
    if (!kylan || !accounts) return
    try {
      const listMints = Object.values(accounts).map(({ mint }) => mint)
      const promise = listMints.map((mint) => {
        return kylan.deriveCertAddress(printerAddress, mint)
      })
      const listCertAddress = await Promise.all(promise)
      setCertAddress(listCertAddress)
    } catch (err: any) {
      window.notify({ type: 'error', description: err.message })
    }
  }, [accounts])

  useEffect(() => {
    getCertAddress()
  }, [getCertAddress])

  return (
    <Row gutter={[24, 24]}>
      <Col span={24}>
        <Row>
          <Col flex="auto">
            <Typography.Title level={5}>Certificate</Typography.Title>
          </Col>
          <Col>
            <Space>
              <Button
                onClick={() => setVisible(true)}
                icon={<IonIcon name="add-outline" />}
              >
                Add new
              </Button>
            </Space>
          </Col>
        </Row>
      </Col>
      <Col span={24}>
        <Row gutter={[24, 24]}>
          {certAddress?.map((certAddr, idx) => (
            <CertificateCard certAddress={certAddr} key={certAddr + idx} />
          ))}
        </Row>
      </Col>
      <NewCertificate visible={visible} onClose={() => setVisible(false)} />
    </Row>
  )
}

export default Certificate
