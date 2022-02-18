import { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Button, Card, Col, Row, Typography } from 'antd'
import NumericInput from 'shared/antd/numericInput'

import { AppDispatch, AppState } from 'store'
import { setBidAmount } from 'store/bid.reducer'

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
  } = useSelector((state: AppState) => state)

  const downSizeInput = useCallback(() => {
    if (!bidAmount) return setFont(AmountSize.large)
    if (bidAmount.length < 6) return setFont(AmountSize.large)
    if (bidAmount.length < 9) return setFont(AmountSize.medium)
    if (bidAmount.length < 14) return setFont(AmountSize.small)
    return setFont(AmountSize.xsmall)
  }, [bidAmount])

  useEffect(() => {
    downSizeInput()
  }, [downSizeInput])
  return (
    <Card
      bordered={false}
      style={{ background: '#E0E1EE' }}
      bodyStyle={{ padding: '12px 16px' }}
    >
      <Row>
        <Col span={24}>
          <Typography.Text type="secondary">Amount</Typography.Text>
        </Col>
        <Col span={24}>
          <NumericInput
            className={`special-font special-font-${font}`}
            placeholder="0"
            bordered={false}
            onValue={(val) => dispatch(setBidAmount(val))}
            value={bidAmount}
            suffix={
              <Button onClick={() => {}}>
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
