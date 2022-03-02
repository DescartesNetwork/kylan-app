import { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Button, Card, Col, Row, Space, Tooltip, Typography } from 'antd'
import NumericInput from 'shared/antd/numericInput'

import { AppDispatch, AppState } from 'store'
import { setBidAmount } from 'store/bid.reducer'
import { PayState } from 'constant'
import { numeric } from 'shared/util'
import { MintSymbol } from 'shared/antd/mint'
import useChequeBalance from 'hook/useChequeBalance'
import useAccountBalance from 'hook/useAccountBalance'

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
    main: { printerType, mintSelected },
  } = useSelector((state: AppState) => state)
  const chequeBalance = useChequeBalance()
  const accountBalance = useAccountBalance()

  const payback = printerType === PayState.Payback
  const maxBalance = payback ? chequeBalance : accountBalance
  const symbol = payback ? 'KUSD' : <MintSymbol mintAddress={mintSelected} />

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
              <Tooltip title={maxBalance}>
                <Space size={4}>
                  <Typography.Text type="secondary">Available:</Typography.Text>
                  <Space>
                    <Typography.Text>
                      {numeric(maxBalance).format('0,0.[000]a')}
                    </Typography.Text>
                    <Typography.Text type="secondary" className="caption">
                      {symbol}
                    </Typography.Text>
                  </Space>
                </Space>
              </Tooltip>
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
