import { CSSProperties } from 'react'
import { BN } from '@project-serum/anchor'

import { Col, Row, Space, Typography } from 'antd'
import { MintAvatar, MintSymbol } from 'shared/antd/mint'

import { KUSD_DECIMAL } from 'constant'

const TokenPrintedCard = ({
  secureAddress,
  amount,
  style,
}: {
  secureAddress: string
  amount: BN
  style: CSSProperties | undefined
}) => {
  return (
    <Row gutter={[16, 16]} style={style}>
      <Col span={24}>
        <Space>
          <MintAvatar size={24} mintAddress={secureAddress} />
          <MintSymbol mintAddress={secureAddress} />
        </Space>
      </Col>
      <Col span={24}>
        <Typography.Title level={5}>
          ${amount.toNumber() / 10 ** KUSD_DECIMAL}
        </Typography.Title>
      </Col>
    </Row>
  )
}

export default TokenPrintedCard
