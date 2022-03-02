import { useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import { BN } from '@project-serum/anchor'
import { ChequeData } from '@project-kylan/core'

import { Button, Col, Row, Space, Typography } from 'antd'
import TokenPrintedCard from './TokenPrintedCard'
import IonIcon from 'components/ionicon'

import { AppState } from 'store'
import { KUSD_DECIMAL } from 'constant'
import { numeric } from 'shared/util'

const DEFAULT_END = 3
const DEFAULT_START = 0

const TotalTokenPrinted = () => {
  const { printer } = useSelector((state: AppState) => state)
  const [startArr, setStartArr] = useState(DEFAULT_START)
  const [endArr, setEndArr] = useState(DEFAULT_END)

  const slideRight = () => {
    setStartArr(startArr + 1)
    setEndArr(endArr + 1)
  }

  const slideLeft = () => {
    setStartArr(startArr - 1)
    setEndArr(endArr - 1)
  }

  const totalPrinted = useMemo(() => {
    let sum = 0
    if (printer)
      Object.values(printer).map(
        ({ amount }) => (sum += amount.toNumber() / 10 ** KUSD_DECIMAL),
      )
    return sum
  }, [printer])

  const filterPrinters = useMemo(() => {
    const printers = Object.values(printer).map((printerData) => printerData)
    const tokenPrinted: Record<string, ChequeData> = {}
    for (const printer of printers) {
      const { secureToken, amount } = printer
      const secureAddress = secureToken.toBase58()
      if (tokenPrinted[secureAddress]) {
        const { amount: oldAmount } = tokenPrinted[secureAddress]
        const newAmount = oldAmount.toNumber() + amount.toNumber()

        tokenPrinted[secureAddress] = {
          ...tokenPrinted[secureAddress],
          amount: new BN(newAmount),
        }
      } else tokenPrinted[secureAddress] = printer
    }
    return Object.values(tokenPrinted).map((printerData) => printerData)
  }, [printer])

  const availablePrinters = filterPrinters.slice(startArr, endArr)
  const disabledLeft = startArr === DEFAULT_START
  const disabledRight = endArr >= filterPrinters.length

  return (
    <Row gutter={[28, 28]}>
      <Col span={24}>
        <Row align="middle">
          <Col flex="auto">
            <Typography.Text>Total token printed</Typography.Text>
          </Col>
          <Col>
            <Typography.Title level={3}>
              ${numeric(totalPrinted).format('0,0.[0000]a')}
            </Typography.Title>
          </Col>
        </Row>
      </Col>
      <Col span={24}>
        <Row gutter={[24, 24]}>
          {availablePrinters.map((pinter, idx) => (
            <Col span={8} key={pinter.secureToken.toBase58()}>
              <TokenPrintedCard
                style={{
                  borderRight:
                    idx !== availablePrinters.length - 1
                      ? 'solid 1px #D3D3D6'
                      : 'unset',
                }}
                secureAddress={pinter.secureToken.toBase58()}
                amount={pinter.amount}
              />
            </Col>
          ))}
        </Row>
      </Col>
      <Col span={24} style={{ textAlign: 'center' }}>
        <Space>
          <Button onClick={slideLeft} disabled={disabledLeft}>
            <span>
              <IonIcon name="chevron-back-outline" />
            </span>
          </Button>
          <Button onClick={slideRight} disabled={disabledRight}>
            <span>
              <IonIcon name="chevron-forward-outline" />
            </span>
          </Button>
        </Space>
      </Col>
    </Row>
  )
}

export default TotalTokenPrinted
