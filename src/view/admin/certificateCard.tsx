import { ReactNode, useCallback, useState } from 'react'
import { useSelector } from 'react-redux'
import { BN } from '@project-serum/anchor'

import { Col, Row, Select, Space, Typography, Input } from 'antd'
import PixelButton from 'components/pixelButton'
import PixelCard from 'components/pixelCard'
import CopyAddress from 'components/copyAddress'

import IonIcon from 'components/ionicon'
import { MintAvatar, MintSymbol } from 'shared/antd/mint'
import { AppState } from 'store'
import useMintDecimals from 'hook/useMintDecimal'

import NumericInput from 'shared/antd/numericInput'
import { numeric, rate2Price } from 'shared/util'
import { CERTIFICATE_STATUS, KUSD_DECIMAL } from 'constant'
import { useAccount } from 'providers'

type CertStatus =
  | 'uninitialized'
  | 'active'
  | 'printOnly'
  | 'burnOnly'
  | 'paused'

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
  status: CertStatus
  onChange: (status: CertStatus) => void
}) => {
  return (
    <Select value={status} onChange={onChange} style={{ minWidth: 163 }}>
      <Select.Option value="active">Active</Select.Option>
      <Select.Option value="printOnly">Print only</Select.Option>
      <Select.Option value="burnOnly">Burn only</Select.Option>
      <Select.Option value="paused">Pause</Select.Option>
    </Select>
  )
}

const CertificateCard = ({ certAddress }: { certAddress: string }) => {
  const [status, setStatus] = useState<CertStatus>()
  const [fee, setFee] = useState('')
  const [taxman, setTaxman] = useState('')
  const [loading, setLoading] = useState(false)
  const { certificates } = useSelector((state: AppState) => state)
  const certData = certificates[certAddress] || {}
  const { accounts } = useAccount()

  const secureAddress = certData?.secureToken.toBase58()
  const secureDecimal = useMintDecimals(secureAddress) || 0
  const price = rate2Price(certData.rate, secureDecimal)
  const defaultFee = certData?.fee.toNumber() / Math.pow(10, 6)
  const defaultTaxman = certData?.taxman.toBase58()
  const defaultStatus = Object.keys(certData.state as Object)[0]
  const { owner: defaultTaxmanAuth } = accounts[defaultTaxman] || {}

  const onUpdateCert = useCallback(async () => {
    setLoading(true)
    try {
      const { kylan } = window.kylan
      const parseFee = Number(fee)
      if (parseFee && parseFee !== defaultFee) {
        const feeBN = new BN(parseFee * 10 ** KUSD_DECIMAL)
        await kylan.setCertFee(feeBN, certAddress)
      }
      if (taxman && taxman !== defaultTaxmanAuth)
        await kylan.setCertTaxman(taxman, certAddress)
      if (status && status !== defaultStatus) {
        const certStatus = CERTIFICATE_STATUS[status]
        await kylan.setCertState(certStatus, certAddress)
      }
      window.notify({
        type: 'success',
        description: 'Certificate has been updated.',
      })
    } catch (err: any) {
      window.notify({ type: 'error', description: err.message })
    } finally {
      setLoading(false)
    }
  }, [
    certAddress,
    defaultFee,
    defaultStatus,
    defaultTaxmanAuth,
    fee,
    status,
    taxman,
  ])

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
                    <Input
                      defaultValue={defaultTaxmanAuth || defaultTaxman}
                      onChange={(e) => setTaxman(e.target.value)}
                    />
                  }
                />
              </Col>
              <Col span={24}>
                <RowContent
                  label={'Status'}
                  value={
                    <SelectCertStatus
                      status={status || (defaultStatus as CertStatus)}
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
