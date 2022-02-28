import { useState } from 'react'

import { Col, Modal, Row, Space, Typography } from 'antd'
import IonIcon from 'components/ionicon'
import PixelCard from 'components/pixelCard'
import { MintAvatar, MintSymbol } from 'shared/antd/mint'
import { useAccount } from 'providers'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, AppState } from 'store'
import { onSelectedMint } from 'store/main.reducer'

type MintProps = {
  mintAddress?: string
  onClick?: () => void
}

const MintInfo = ({ onClick = () => {} }: MintProps) => {
  const {
    main: { mintSelected },
  } = useSelector((state: AppState) => state)
  return (
    <Space style={{ cursor: 'pointer' }} align="center" onClick={onClick}>
      <MintAvatar mintAddress={mintSelected} />
      <MintSymbol mintAddress={mintSelected} />
    </Space>
  )
}

const MintSelection = () => {
  const dispatch = useDispatch<AppDispatch>()
  const [visible, setVisible] = useState(false)
  const { accounts } = useAccount() || {}
  const {
    main: { mintSelected },
  } = useSelector((state: AppState) => state)

  const mints = Object.values(accounts).map(({ mint }) => mint) || {}

  // const onOpenModalSelectMint = () => {
  //   setVisible(true)
  // }

  return (
    <Row gutter={[16, 16]}>
      <Col span={24}>
        <MintInfo onClick={() => setVisible(true)} />
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
          <Row gutter={[28, 28]} style={{ maxHeight: 400, overflow: 'auto' }}>
            <Col span={24}>
              <Typography.Title level={5}>Select a token</Typography.Title>
            </Col>
            <Col span={24}>
              <Row gutter={[24, 24]}>
                {mints?.map((mintAddr, idx) => (
                  <Col span={24} key={idx}>
                    <Row
                      style={{ cursor: 'pointer' }}
                      onClick={() => {
                        dispatch(onSelectedMint(mintAddr))
                        setVisible(false)
                      }}
                    >
                      <Col flex="auto">
                        <Space>
                          <MintAvatar mintAddress={mintAddr} />
                          <MintSymbol mintAddress={mintAddr} />
                        </Space>
                      </Col>
                      {mintAddr === mintSelected && (
                        <Col>
                          <IonIcon
                            style={{ color: '#00C02A' }}
                            name="checkmark-outline"
                          />
                        </Col>
                      )}
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
