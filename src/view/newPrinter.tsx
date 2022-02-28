import { Button, Col, Row, Typography } from 'antd'
import { useState } from 'react'

const NewPrinter = () => {
  const [printer, setPrinter] = useState('')

  const newPrinter = async () => {
    try {
      const { kylan } = window.kylan
      const { printerAddress } = await kylan.initializePrinter()
      return setPrinter(printerAddress)
    } catch (er: any) {
      window.notify({ type: 'error', description: er.message })
    }
  }

  return (
    <Row gutter={[24, 24]}>
      <Col span={24}>
        <Typography.Text>Printer Address: {printer}</Typography.Text>
      </Col>
      <Col span={24}>
        <Button onClick={newPrinter}>New Printer</Button>
      </Col>
    </Row>
  )
}

export default NewPrinter
