import { ReactNode, useCallback, useState } from 'react'
import { useSelector } from 'react-redux'
import { BN } from '@project-serum/anchor'

import { Col, Row, Select, Space, Typography } from 'antd'
import PixelButton from 'components/pixelButton'
import PixelCard from 'components/pixelCard'
import CopyAddress from 'components/copyAddress'

import IonIcon from 'components/ionicon'
import { MintAvatar, MintSymbol } from 'shared/antd/mint'
import { AppState } from 'store'
import useMintDecimals from 'hook/useMintDecimal'

import NumericInput from 'shared/antd/numericInput'
import { numeric, rate2Price } from 'shared/util'
import { KUSD_DECIMAL } from 'constant'

const CertCardHeader = ({
  mintAddress,
  price,
}: {
  mintAddress: string
  price: string
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
        <Typography.Title level={5}>{price} KUSD</Typography.Title>
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
  const [fee, setFee] = useState('')
  const [taxman, setTaxman] = useState('')
  const [loading, setLoading] = useState(false)
  const { certificates } = useSelector((state: AppState) => state)
  const certData = certificates[certAddress] || {}

  const secureAddress = certData?.secureToken.toBase58()
  const secureDecimal = useMintDecimals(secureAddress) || 0
  const price = rate2Price(certData.rate, secureDecimal)
  const defaultFee = certData?.fee.toNumber() / Math.pow(10, 6)
  const defaultTaxman = certData?.taxman.toBase58()
  const defaultStatus = Object.keys(certData.state as Object)[0]

  const onUpdateCert = useCallback(async () => {
    setLoading(true)
    try {
      const { kylan } = window.kylan
      const parseFee = Number(fee)
      if (parseFee !== defaultFee) {
        const feeBN = new BN(parseFee * 10 ** KUSD_DECIMAL)
        const { txId } = await kylan.setCertFee(feeBN, certAddress)
        console.log(txId)
      }
      if (taxman && taxman !== defaultTaxman) {
        const { txId } = await kylan.setCertTaxman(taxman, certAddress)
        console.log(txId)
      }
    } catch (err: any) {
      window.notify({ type: 'error', description: err.message })
    } finally {
      setLoading(false)
    }
  }, [certAddress, defaultFee, defaultTaxman, fee, taxman])

  return (
    <Col xs={24} md={12} lg={8}>
      <PixelCard>
        <Row gutter={[24, 24]}>
          <Col span={24}>
            <CertCardHeader
              mintAddress={secureAddress}
              price={numeric(price).format('0,0.[000]a')}
            />
          </Col>
          <Col span={24}>
            <Row gutter={[12, 12]}>
              <Col span={24}>
                <RowContent
                  label={'Secure token'}
                  value={<CopyAddress address={secureAddress} />}
                />
              </Col>
              <Col span={24}>
                <RowContent
                  label={'Fee'}
                  value={
                    <NumericInput value={fee || defaultFee} onValue={setFee} />
                  }
                />
              </Col>
              <Col span={24}>
                <RowContent
                  label={'Taxman'}
                  value={
                    <NumericInput
                      value={taxman || defaultTaxman}
                      onValue={setTaxman}
                    />
                  }
                />
              </Col>
              <Col span={24}>
                <RowContent
                  label={'Status'}
                  value={
                    <SelectCertStatus
                      status={status || defaultStatus}
                      onChange={setStatus}
                    />
                  }
                />
              </Col>
            </Row>
          </Col>
          <Col span={24}>
            <PixelButton
              suffix={<IonIcon name="print-outline" />}
              onClick={onUpdateCert}
              loading={loading}
              block
            >
              Update
            </PixelButton>
          </Col>
        </Row>
      </PixelCard>
    </Col>
  )
}

export default CertificateCard
