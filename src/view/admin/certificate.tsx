import { useState } from 'react'

import { Button, Col, Row, Space, Typography } from 'antd'
import IonIcon from 'components/ionicon'
import CertificateCard from './certificateCard'

const Certificate = () => {
  const [listCert, setListCert] = useState([1, 2, 3])

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
                onClick={() => setListCert([...listCert, listCert.length + 1])}
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
          {listCert.map((cert, idx) => (
            <Col span={8} key={idx}>
              <CertificateCard />
            </Col>
          ))}
        </Row>
      </Col>
    </Row>
  )
}

export default Certificate
