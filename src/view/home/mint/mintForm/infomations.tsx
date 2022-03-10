import { ReactNode, useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import { BN } from '@project-serum/anchor'

import { Col, Row, Space, Typography, Button } from 'antd'
import IonIcon from 'components/ionicon'
import { numeric, rate2Price } from 'shared/util'

import { AppState } from 'store'
import CardPayBack from './cardPayBack'
import { PRECISION, PayState } from 'constant'
import useMintDecimals from 'hook/useMintDecimal'
import { MintSymbol } from 'shared/antd/mint'
import useCeritificateAddress from 'hook/useCertificateAddress'

const RowContent = ({
  label = '',
  value = '',
}: {
  label?: string
  value?: ReactNode
}) => {
  return (
    <Row gutter={[16, 16]}>
      <Col flex="auto">
        <Typography.Text type="secondary">{label}</Typography.Text>
      </Col>
      <Col>
        <Typography.Text style={{ fontSize: 16 }}>{value}</Typography.Text>
      </Col>
    </Row>
  )
}
const ExchangeRate = ({ rate }: { rate: BN | undefined }) => {
  const [isPayback, setIsPayback] = useState(false)
  const {
    main: { mintSelected },
  } = useSelector((state: AppState) => state)
  const secureDecimal = useMintDecimals(mintSelected) || 0

  const { kylan, secure } = useMemo(() => {
    if (!rate) return { kylan: 0, secure: 0 }
    let kylan = 1
    let secure = rate2Price(rate, secureDecimal)
    if (isPayback) {
      kylan = 1 / secure
      secure = 1
    }
    return { kylan, secure }
  }, [isPayback, rate, secureDecimal])

  if (isPayback)
    return (
      <Space style={{ fontSize: 16 }}>
        <Button
          type="text"
          shape="circle"
          icon={<IonIcon name="swap-horizontal-outline" />}
          onClick={() => setIsPayback(!isPayback)}
        />
        <Space>
          <Typography.Text>
            {numeric(secure).format('0,0.[0000]a')}
          </Typography.Text>
          <MintSymbol mintAddress={mintSelected} />
        </Space>
        <Typography.Text>=</Typography.Text>
        <Typography.Text>
          {numeric(kylan).format('0,0.[0000]a')} KUSD
        </Typography.Text>
      </Space>
    )

  return (
    <Space style={{ fontSize: 16 }}>
      <Button
        type="text"
        shape="circle"
        icon={<IonIcon name="swap-horizontal-outline" />}
        onClick={() => setIsPayback(!isPayback)}
      />
      <Typography.Text>
        {numeric(kylan).format('0,0.[0000]a')} KUSD
      </Typography.Text>
      <Typography.Text>=</Typography.Text>
      <Space>
        <Typography.Text>
          {numeric(secure).format('0,0.[0000]a')}
        </Typography.Text>
        <MintSymbol mintAddress={mintSelected} />
      </Space>
    </Space>
  )
}

const Infomations = () => {
  const {
    main: { printerType },
    certificates,
  } = useSelector((state: AppState) => state)
  const { certAddress } = useCeritificateAddress()
  const { fee, rate } = certificates[certAddress] || {}

  const payback = printerType === PayState.Payback
  const burnFee = `${(fee?.toNumber() / PRECISION) * 100 || 0}%`

  return (
    <Row gutter={[24, 24]}>
      <Col span={24}>
        <CardPayBack payback={payback} />
      </Col>
      <Col span={24}>
        <Row gutter={[10, 10]}>
          <Col span={24}>
            <RowContent
              label="Convert rate"
              value={<ExchangeRate rate={rate} />}
            />
          </Col>
          <Col span={24}>
            <RowContent
              label={payback ? 'Redemption fee' : 'Deposit Fee'}
              value={payback ? burnFee : '0%'}
            />
          </Col>
        </Row>
      </Col>
    </Row>
  )
}

export default Infomations
