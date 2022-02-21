import { ReactNode, useMemo, useState } from 'react'
import { useSelector } from 'react-redux'

import { Col, Row, Space, Typography, Button } from 'antd'
import IonIcon from 'components/ionicon'
import { numeric } from 'shared/util'

import {} from 'store/bid.reducer'
import { AppState } from 'store'
import CardPayBack from './cardPayBack'
import { PayState } from 'constant'

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
const ExchangeRate = () => {
  const [isPayback, setIsPayback] = useState(false)

  // E.g
  const { kylan, mint } = useMemo(() => {
    const rate = 0.98
    let kylan = 1
    let mint = kylan * rate
    if (isPayback) {
      mint = 1
      kylan = mint / 0.98
    }
    return { kylan, mint }
  }, [isPayback])

  return (
    <Space style={{ fontSize: 16 }}>
      <Button
        type="text"
        shape="circle"
        icon={<IonIcon name="swap-horizontal-outline" />}
        onClick={() => setIsPayback(!isPayback)}
      />
      <Typography.Text>
        {numeric(kylan).format('0,0.[0000]a')} KYLAN
      </Typography.Text>
      <Typography.Text>=</Typography.Text>
      <Typography.Text>
        {numeric(mint).format('0,0.[0000]a')} USDC
      </Typography.Text>
    </Space>
  )
}

const Infomations = () => {
  const {
    bid: { bidAmount },
    main: { printerType },
  } = useSelector((state: AppState) => state)

  const payback = printerType === PayState.Payback

  return (
    <Row gutter={[24, 24]}>
      <Col span={24}>
        <CardPayBack payback={payback} />
      </Col>
      <Col span={24}>
        <Row gutter={[10, 10]}>
          <Col span={24}>
            <RowContent label="Exchange rate" value={<ExchangeRate />} />
          </Col>
          <Col span={24}>
            <RowContent label="Exchange rate" value="$0" />
          </Col>
          <Col span={24}>
            <RowContent
              label="Exchange rate"
              value={numeric(bidAmount).format('0,0.[0000]a')}
            />
          </Col>
        </Row>
      </Col>
    </Row>
  )
}

export default Infomations
