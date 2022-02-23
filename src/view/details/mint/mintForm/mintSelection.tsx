import { useState } from 'react'

import { Avatar, Col, Modal, Row, Space, Typography } from 'antd'
import IonIcon from 'components/ionicon'
import PixelCard from 'components/pixelCard'
import { MintAvatar, MintSymbol } from 'shared/antd/mint'

type MintProps = {
  mintAddress?: string
  onClick?: () => void
}

const MintInfo = ({ mintAddress = '', onClick = () => {} }: MintProps) => {
  return (
    <Space style={{ cursor: 'pointer' }} align="center" onClick={onClick}>
      <Avatar.Group>
        <Avatar size={24} />
        <Avatar size={24} />
      </Avatar.Group>
      <Typography.Text>USDC/SNTR</Typography.Text>
    </Space>
  )
}

const MintSelection = () => {
  const [visible, setVisible] = useState(false)

  const onOpenModalSelectMint = () => {
    setVisible(true)
  }

  const onSelectMint = (mintAddress: string) => {
    console.log(mintAddress)
  }

  return (
    <Row gutter={[16, 16]}>
      <Col span={24}>
        <MintInfo onClick={onOpenModalSelectMint} />
      </Col>
      <Modal
        visible={visible}
        onCancel={() => setVisible(false)}
        centered
        footer={false}
        bodyStyle={{ padding: 0 }}
        closeIcon={<IonIcon name="close-outline" />}
        className="pixel-modal"
      >
        <PixelCard>
          <Row gutter={[28, 28]}>
            <Col span={24}>
              <Typography.Title level={5}>Select a token</Typography.Title>
            </Col>
            <Col span={24}>
              <Row gutter={[24, 24]}>
                {[1, 2, 3, 4].map((token, idx) => (
                  <Col span={24} key={idx}>
                    <Row
                      style={{ cursor: 'pointer' }}
                      onClick={() => onSelectMint('')}
                    >
                      <Col flex="auto">
                        <Space>
                          <MintAvatar mintAddress={`${token}`} />
                          <MintSymbol mintAddress={`${token}`} />
                        </Space>
                      </Col>
                      <Col>
                        <IonIcon
                          style={{ color: '#00C02A' }}
                          name="checkmark-outline"
                        />
                      </Col>
                    </Row>
                  </Col>
                ))}
              </Row>
            </Col>
          </Row>
        </PixelCard>
      </Modal>
    </Row>
  )
}

export default MintSelection
