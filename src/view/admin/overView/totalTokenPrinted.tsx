import { useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import { BN } from '@project-serum/anchor'
import { ChequeData } from '@project-kylan/core'

import { Button, Col, Row, Space, Typography } from 'antd'
import TokenPrintedCard from './TokenPrintedCard'
import IonIcon from 'components/ionicon'

import usePrinterBalance from 'hook/usePrinterBalance'
import { AppState } from 'store'
import { numeric } from 'shared/util'

const DEFAULT_CURSOR_INDEX = 0
const CURSOR_OFFSET = 3

const TotalTokenPrinted = () => {
  const { cheques } = useSelector((state: AppState) => state)
  const [cursorIndex, setCursorIndex] = useState(DEFAULT_CURSOR_INDEX)
  const { printerTVL } = usePrinterBalance()

  const filterPrinters = useMemo(() => {
    const printers = Object.values(cheques).map((printerData) => printerData)
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
  }, [cheques])

  const slideRight = () => setCursorIndex(cursorIndex + 1)
  const slideLeft = () => setCursorIndex(cursorIndex - 1)

  const availablePrinters = filterPrinters.slice(
    cursorIndex,
    cursorIndex + CURSOR_OFFSET,
  )
  const disabledLeft = !cursorIndex
  const disabledRight = cursorIndex + CURSOR_OFFSET >= filterPrinters.length

  return (
    <Row gutter={[28, 28]}>
      <Col span={24}>
        <Row align="middle">
          <Col flex="auto">
            <Typography.Text>Total token printed</Typography.Text>
          </Col>
          <Col>
            <Typography.Title level={3}>
              ${numeric(printerTVL).format('0,0.[0000]a')}
            </Typography.Title>
          </Col>
        </Row>
      </Col>
      <Col span={24}>
        <Row gutter={[24, 24]}>
          {availablePrinters.map(({ secureToken, amount }, idx) => (
            <Col span={8} key={secureToken.toBase58()}>
              <TokenPrintedCard
                style={{
                  borderRight:
                    idx !== availablePrinters.length - 1
                      ? 'solid 1px #D3D3D6'
                      : 'unset',
                }}
                secureAddress={secureToken.toBase58()}
                amount={amount}
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
