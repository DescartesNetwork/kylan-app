import { ReactNode, useMemo, useState } from 'react'
import { useSelector } from 'react-redux'

import {
  Avatar,
  Card,
  Col,
  Row,
  Select,
  Space,
  Typography,
  Image,
  Button,
} from 'antd'
import IonIcon from 'components/ionicon'
import { numeric } from 'shared/util'

import IconArrow from 'static/images/icon-arrow.svg'
import {} from 'store/bid.reducer'
import { AppState } from 'store'

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
  } = useSelector((state: AppState) => state)

  return (
    <Row gutter={[24, 24]}>
      <Col span={24}>
        <Card bordered={false} bodyStyle={{ padding: '0 24px' }}>
          <Row justify="space-between">
            <Col style={{ padding: '24px 0' }}>
              <Space style={{ minWidth: 180 }} direction="vertical">
                <Typography.Text type="secondary">Pay</Typography.Text>
                <Select
                  className="pay-select"
                  bordered={false}
                  dropdownMatchSelectWidth={170}
                >
                  <Select.Option>
                    <Space align="center">
                      <Avatar.Group>
                        <Avatar size={24} />
                        <Avatar size={24} />
                      </Avatar.Group>
                      <Typography.Text>USDC/SNTR</Typography.Text>
                    </Space>
                  </Select.Option>
                </Select>
              </Space>
            </Col>
            <Col className="pay-icon">
              <Image src={IconArrow} preview={false} />
            </Col>
            <Col style={{ padding: '24px 0' }}>
              <Space style={{ minWidth: 180 }} direction="vertical" align="end">
                <Typography.Text type="secondary">Receive</Typography.Text>
                <Space style={{ minHeight: 30 }} align="center">
                  <Avatar size={24} />
                  <Typography.Text>KYLAN</Typography.Text>
                </Space>
              </Space>
            </Col>
          </Row>
        </Card>
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
