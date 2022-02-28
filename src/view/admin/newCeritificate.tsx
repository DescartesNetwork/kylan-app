import { useCallback, useState } from 'react'
import { useSelector } from 'react-redux'
import { account, AccountData } from '@senswap/sen-js'
import { BN } from '@project-serum/anchor'

import { Avatar, Card, Col, Modal, Row, Select, Space, Typography } from 'antd'
import AccountItem from 'components/accountItem'
import IonIcon from 'components/ionicon'
import PixelCard from 'components/pixelCard'
import Search from 'components/search'
import NumericInput from 'shared/antd/numericInput'
import PixelButton from 'components/pixelButton'

import { AppState } from 'store'
import configs from 'configs'
import { useMint } from 'providers'
import { solExplorer } from 'shared/util'
import kylanIcon from 'static/images/logo/logo-mobile.svg'

const {
  sol: { printerAddress },
} = configs

type NewCertProps = {
  visible?: boolean
  onClose?: () => void
}

const DECIMAL = Math.pow(10, 6)

const NewCertificate = ({
  visible = false,
  onClose = () => {},
}: NewCertProps) => {
  const [listAccount, setListAccount] = useState<string[]>([])
  const [soureAddressSelected, setSoureAddressSelected] = useState('')
  const [price, setPrice] = useState('0')
  const [fee, setFee] = useState('0')
  const [loading, setLoading] = useState(false)
  const { tokenProvider } = useMint()
  const {
    wallet: { address: walletAddress },
  } = useSelector((state: AppState) => state)

  const onSearch = useCallback(
    async (accounts: Record<string, AccountData>) => {
      const listAccount: string[] = []
      // sort, prioritize sen account
      const prioritizeAccount = []
      for (const addr in accounts) {
        const acc = accounts[addr]
        const token = await tokenProvider.findByAddress(acc.mint)
        if (token) {
          // check prioritize
          if (token.symbol === 'SEN') prioritizeAccount.push(addr)
          else listAccount.unshift(addr)
          continue
        }
        listAccount.push(addr)
      }
      const listAccoutAddr = [...prioritizeAccount, ...listAccount]
      listAccoutAddr.filter((addr, idx) => listAccoutAddr.indexOf(addr) === idx)
      return setListAccount(listAccoutAddr)
    },
    [tokenProvider],
  )

  const onNewCertificate = useCallback(async () => {
    if (
      !account.isAddress(printerAddress) ||
      !account.isAddress(soureAddressSelected) ||
      !price
    )
      return
    setLoading(true)
    try {
      const { splt } = window.kylan
      const priceBN = new BN(Number(price) * DECIMAL)
      const taxmanAddress = await splt.deriveAssociatedAddress(
        walletAddress,
        soureAddressSelected,
      )
      const { kylan } = window.kylan
      const { txId } = await kylan.initializeCert(
        printerAddress,
        soureAddressSelected,
        taxmanAddress,
        priceBN,
      )
      await window.notify({
        type: 'success',
        description: `Certificate created successfully, Click to view details`,
        onClick: () => window.open(solExplorer(txId), '_blank'),
      })
      onClose()
    } catch (er: any) {
      window.notify({ type: 'error', description: er.message })
    } finally {
      setLoading(false)
    }
  }, [onClose, price, soureAddressSelected, walletAddress])

  return (
    <Modal
      visible={visible}
      onCancel={onClose}
      centered
      footer={false}
      bodyStyle={{ padding: 0 }}
      closeIcon={<IonIcon name="close-outline" />}
      className="pixel-modal"
    >
      <PixelCard>
        <Row gutter={[16, 16]}>
          <Col span={24}>
            <Typography.Title level={5}>New Certificate</Typography.Title>
          </Col>
          <Col span={12}>
            <Row gutter={[4, 4]}>
              <Col span={24}>
                <Typography.Text type="secondary">
                  Printer address
                </Typography.Text>
              </Col>
              <Col>
                <Space className="printer-select">
                  <Avatar src={kylanIcon} size={24} />
                  <Typography.Text>Kylan</Typography.Text>
                </Space>
              </Col>
            </Row>
          </Col>
          <Col span={12}>
            <Row gutter={[4, 4]}>
              <Col span={24}>
                <Typography.Text type="secondary">Secure token</Typography.Text>
              </Col>
              <Col>
                <Select
                  className="secure-select"
                  bordered={false}
                  dropdownRender={(menu) => (
                    <Row gutter={[8, 8]}>
                      <Col span={24}>
                        <Search onChange={onSearch} />
                      </Col>
                      <Col span={24}>{menu}</Col>
                    </Row>
                  )}
                >
                  {listAccount.map((accAddr) => (
                    <Select.Option key={accAddr}>
                      <AccountItem
                        accountAddr={accAddr}
                        onClick={setSoureAddressSelected}
                      />
                    </Select.Option>
                  ))}
                </Select>
              </Col>
            </Row>
          </Col>
          <Col span={24}>
            <Row gutter={[4, 4]}>
              <Col span={24}>
                <Typography.Text>Pirce</Typography.Text>
              </Col>
              <Col span={24}>
                <Card style={{ borderRadius: 8 }} bodyStyle={{ padding: 2 }}>
                  <NumericInput
                    value={price}
                    onValue={setPrice}
                    bordered={false}
                  />
                </Card>
              </Col>
            </Row>
          </Col>
          <Col span={24}>
            <Row gutter={[4, 4]}>
              <Col span={24}>
                <Typography.Text>Fee</Typography.Text>
              </Col>
              <Col span={24}>
                <Card style={{ borderRadius: 8 }} bodyStyle={{ padding: 2 }}>
                  <NumericInput value={fee} onValue={setFee} bordered={false} />
                </Card>
              </Col>
            </Row>
          </Col>
          <Col span={24}>
            <PixelButton onClick={onNewCertificate} loading={loading} block>
              New Certificate
            </PixelButton>
          </Col>
        </Row>
      </PixelCard>
    </Modal>
  )
}

export default NewCertificate
