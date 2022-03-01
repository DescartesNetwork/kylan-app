import { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Button, Card, Col, Row, Space, Typography } from 'antd'
import NumericInput from 'shared/antd/numericInput'

import { AppDispatch, AppState } from 'store'
import { setBidAmount } from 'store/bid.reducer'
import { PayState } from 'constant'
import { numeric } from 'shared/util'

enum AmountSize {
  large = 'large',
  medium = 'medium',
  small = 'small',
  xsmall = 'xsmall',
}

const Amount = () => {
  const [font, setFont] = useState<string>(AmountSize.large)
  const dispatch = useDispatch<AppDispatch>()
  const {
    bid: { bidAmount },
    main: { available, kylanBalance, printerType },
  } = useSelector((state: AppState) => state)

  const downSizeInput = useCallback(() => {
    if (!bidAmount) return setFont(AmountSize.large)
    if (bidAmount.length < 5) return setFont(AmountSize.large)
    if (bidAmount.length < 7) return setFont(AmountSize.medium)
    if (bidAmount.length < 9) return setFont(AmountSize.small)
    return setFont(AmountSize.xsmall)
  }, [bidAmount])

  useEffect(() => {
    downSizeInput()
  }, [downSizeInput])

  const payback = printerType === PayState.Payback
  const maxBalance = payback ? kylanBalance : available

  return (
    <Card
      bordered={false}
      style={{ background: '#E0E1EE' }}
      bodyStyle={{ padding: '12px 16px' }}
    >
      <Row>
        <Col span={24}>
          <Row gutter={0}>
            <Col flex="auto">
              <Typography.Text type="secondary">Amount</Typography.Text>
            </Col>
            <Col>
              <Space size={4}>
                <Typography.Text type="secondary">Available:</Typography.Text>
                <Typography.Text>
                  {numeric(maxBalance).format('0,0.[000]a')}
                </Typography.Text>
              </Space>
            </Col>
          </Row>
        </Col>
        <Col span={24}>
          <NumericInput
            className={`special-font special-font-${font}`}
            placeholder="0"
            bordered={false}
            onValue={(val) => dispatch(setBidAmount(val))}
            value={bidAmount}
            suffix={
              <Button onClick={() => dispatch(setBidAmount(`${maxBalance}`))}>
                <Typography.Title level={5}>Max</Typography.Title>
              </Button>
            }
          />
          <Col style={{ height: 22 }} /> {/* Safe space  */}
        </Col>
      </Row>
    </Card>
  )
}

export default Amount
