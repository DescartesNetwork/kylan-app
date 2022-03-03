import { useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Col, Modal, Row, Space, Typography } from 'antd'
import IonIcon from 'components/ionicon'
import PixelCard from 'components/pixelCard'
import { MintAvatar, MintSymbol } from 'shared/antd/mint'

import { AppDispatch, AppState } from 'store'
import { onSelectedMint } from 'store/main.reducer'
import { PayState } from 'constant'

type MintInfoProps = {
  mintAddress?: string
  onClick?: () => void
}

const MintInfo = ({ onClick = () => {} }: MintInfoProps) => {
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
  const {
    main: { mintSelected, printerType },
    certificates,
  } = useSelector((state: AppState) => state)
  const burnType = printerType === PayState.Payback
  const mintType = printerType === PayState.Mint
  const supportedMints = Object.values(certificates).map(
    ({ secureToken, state }) => {
      return { mintAddress: secureToken.toBase58(), state }
    },
  )
  const filterMints = useMemo(() => {
    let condition = ''
    if (burnType) condition = 'burnOnly'
    if (mintType) condition = 'printOnly'
    return supportedMints.filter(({ state }) => {
      return (
        Object.keys(state as Object).includes(condition) ||
        Object.keys(state as Object).includes('active')
      )
    })
  }, [burnType, mintType, supportedMints])

  return (
    <Row gutter={[16, 16]}>
      <Col span={24}>
        <Space style={{ cursor: 'pointer' }} onClick={() => setVisible(true)}>
          <MintInfo />
          <IonIcon style={{ color: '#7B7B85' }} name="chevron-down-outline" />
        </Space>
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
                {filterMints?.map(({ mintAddress }, idx) => (
                  <Col span={24} key={idx}>
                    <Row
                      style={{ cursor: 'pointer' }}
                      onClick={() => {
                        dispatch(onSelectedMint(mintAddress))
                        setVisible(false)
                      }}
                    >
                      <Col flex="auto">
                        <Space>
                          <MintAvatar mintAddress={mintAddress} />
                          <MintSymbol mintAddress={mintAddress} />
                        </Space>
                      </Col>
                      {mintAddress === mintSelected && (
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
