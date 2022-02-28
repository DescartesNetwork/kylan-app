import { useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import { Button, Col, Row, Space, Typography } from 'antd'
import IonIcon from 'components/ionicon'
import CertificateCard from './certificateCard'
import NewCertificate from './newCeritificate'

import { AppState } from 'store'
import configs from 'configs'

const {
  sol: { printerAddress },
} = configs

const Certificate = () => {
  const [visible, setVisible] = useState(false)
  const { certificates } = useSelector((state: AppState) => state)

  const certAddresses = Object.keys(certificates).map((addr) => addr)

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
          {certAddresses?.map((certAddr, idx) => (
            <CertificateCard certAddress={certAddr} key={certAddr + idx} />
          ))}
        </Row>
      </Col>
      <NewCertificate visible={visible} onClose={() => setVisible(false)} />
    </Row>
  )
}

export default Certificate
