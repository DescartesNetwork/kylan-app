import { Fragment, ReactNode, useState } from 'react'
import { useSelector } from 'react-redux'
import CopyToClipboard from 'react-copy-to-clipboard'

import { Col, Row, Select, Space, Tooltip, Typography } from 'antd'
import PixelButton from 'components/pixelButton'
import PixelCard from 'components/pixelCard'

import IonIcon from 'components/ionicon'
import { MintAvatar, MintSymbol } from 'shared/antd/mint'
import { AppState } from 'store'

import NumericInput from 'shared/antd/numericInput'
import { shortenAddress } from 'shared/util'

const CertCardHeader = ({
  mintAddress,
  price,
}: {
  mintAddress: string
  price: number
}) => {
  return (
    <Row>
      <Col flex="auto">
        <Space>
          <MintAvatar size={24} mintAddress={mintAddress} />
          <MintSymbol mintAddress={mintAddress} />
        </Space>
      </Col>
      <Col>
        <Typography.Title level={5}>${price}</Typography.Title>
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

const SelectCertStatus = ({
  status,
  onChange,
}: {
  status: string
  onChange: (status: string) => void
}) => {
  return (
    <Select value={status} onChange={onChange} style={{ minWidth: 163 }}>
      <Select.Option value="active">Active</Select.Option>
      <Select.Option value="print-only">Print only</Select.Option>
      <Select.Option value="burn-only">Burn only</Select.Option>
      <Select.Option value="pause">Pause</Select.Option>
    </Select>
  )
}

const CertificateCard = ({ certAddress }: { certAddress: string }) => {
  const [status, setStatus] = useState('')
  const { certificates } = useSelector((state: AppState) => state)
  const certData = certificates[certAddress] || {}

  if (!certData) return <Fragment />
  const price = certData.price.toNumber() / Math.pow(10, 6)
  const secureAddress = certData.secureToken.toBase58()
  const fee = certData.fee.toNumber() / Math.pow(10, 6)
  const taxman = certData?.taxman.toBase58()

  return (
    <Col xs={24} md={12} lg={8}>
      <PixelCard>
        <Row gutter={[24, 24]}>
          <Col span={24}>
            <CertCardHeader mintAddress={secureAddress} price={price} />
          </Col>
          <Col span={24}>
            <Row gutter={[12, 12]}>
              <Col span={24}>
                <RowContent
                  label={'Secure token'}
                  value={<TokenAddress address={secureAddress} />}
                />
              </Col>
              <Col span={24}>
                <RowContent label={'KUSD pirce'} value={price} />
              </Col>
              <Col span={24}>
                <RowContent
                  label={'Fee'}
                  value={<NumericInput value={fee} />}
                />
              </Col>
              <Col span={24}>
                <RowContent
                  label={'Tax man'}
                  value={<NumericInput value={taxman} />}
                />
              </Col>
              <Col span={24}>
                <RowContent
                  label={'Status'}
                  value={
                    <SelectCertStatus status={status} onChange={setStatus} />
                  }
                />
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
    </Col>
  )
}

export default CertificateCard
