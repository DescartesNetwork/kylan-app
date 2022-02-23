import { ReactNode, useState } from 'react'
import CopyToClipboard from 'react-copy-to-clipboard'

import { Col, Row, Select, Space, Tooltip, Typography } from 'antd'
import PixelButton from 'components/pixelButton'
import PixelCard from 'components/pixelCard'

import IonIcon from 'components/ionicon'
import { MintAvatar, MintSymbol } from 'shared/antd/mint'
import NumericInput from 'shared/antd/numericInput'
import { shortenAddress } from 'shared/util'

const CertCardHeader = () => {
  return (
    <Row>
      <Col flex="auto">
        <Space>
          <MintAvatar size={24} mintAddress={''} />
          <MintSymbol mintAddress={''} />
        </Space>
      </Col>
      <Col>
        <Typography.Title level={5}>$1</Typography.Title>
      </Col>
    </Row>
  )
}

const RowContent = ({
  label = '',
  value,
}: {
  label?: string
  value?: ReactNode
}) => {
  return (
    <Row gutter={[8, 8]}>
      <Col flex="auto">
        <Typography.Text type="secondary">{label}</Typography.Text>
      </Col>
      <Col>{value}</Col>
    </Row>
  )
}

const TokenAddress = ({ address }: { address: string }) => {
  const [copied, setCopied] = useState(false)

  const onCopy = async () => {
    setCopied(true)
    setTimeout(() => {
      setCopied(false)
    }, 1500)
  }
  return (
    <Space>
      <Typography.Text>{shortenAddress(address)}</Typography.Text>
      <Tooltip title="Copied" visible={copied}>
        <CopyToClipboard text={address} onCopy={onCopy}>
          <IonIcon name="copy-outline" style={{ cursor: 'pointer' }} />
        </CopyToClipboard>
      </Tooltip>
    </Space>
  )
}

const SelectCertStatus = () => {
  return (
    <Select style={{ minWidth: 163 }}>
      <Select.Option value="active">Active</Select.Option>
      <Select.Option value="print-only">Print only</Select.Option>
      <Select.Option value="burn-only">Burn only</Select.Option>
      <Select.Option value="pause">Pause</Select.Option>
    </Select>
  )
}

const CertificateCard = () => {
  return (
    <PixelCard>
      <Row gutter={[24, 24]}>
        <Col span={24}>
          <CertCardHeader />
        </Col>
        <Col span={24}>
          <Row gutter={[12, 12]}>
            <Col span={24}>
              <RowContent
                label={'Secure token'}
                value={<TokenAddress address={'BkLRcJuF54zVsJk'} />}
              />
            </Col>
            <Col span={24}>
              <RowContent label={'KUSD pirce'} value={'$0.998'} />
            </Col>
            <Col span={24}>
              <RowContent label={'Fee'} value={<NumericInput />} />
            </Col>
            <Col span={24}>
              <RowContent label={'Tax man'} value={<NumericInput />} />
            </Col>
            <Col span={24}>
              <RowContent label={'Status'} value={<SelectCertStatus />} />
            </Col>
          </Row>
        </Col>
        <Col span={24}>
          <PixelButton suffix={<IonIcon name="print-outline" />} block>
            Update
          </PixelButton>
        </Col>
      </Row>
    </PixelCard>
  )
}

export default CertificateCard
