import { useState } from 'react'
import { useSolana } from '@gokiprotocol/walletkit'
import QRCode from 'qrcode.react'
import CopyToClipboard from 'react-copy-to-clipboard'

import { Row, Col, Tooltip, Typography, Popover, Space } from 'antd'
import WalletAvatar from './walletAvatar'

import { shortenAddress } from 'shared/util'
import IonIcon from 'components/ionicon'

const QR = ({ address }: { address: string }) => {
  return (
    <Popover
      placement="bottomLeft"
      color="#ffffff"
      overlayInnerStyle={{ paddingTop: 6 }}
      content={
        <QRCode
          value={address}
          size={140}
          bgColor="#ffffff"
          fgColor="#1f1f1f"
        />
      }
      trigger="click"
      arrowPointAtCenter
    >
      <IonIcon name="qr-code-outline" style={{ cursor: 'pointer' }} />
    </Popover>
  )
}

const WalletInfo = () => {
  const [copied, setCopied] = useState(false)
  const { publicKey } = useSolana()
  const walletAddress = publicKey?.toBase58() || ''

  const onCopy = async () => {
    setCopied(true)
    setTimeout(() => {
      setCopied(false)
    }, 1500)
  }

  return (
    <Row gutter={[12, 12]}>
      <Col flex="auto">
        <Space size={12}>
          <WalletAvatar />
          <Typography.Text>
            {shortenAddress(walletAddress, 3, '...')}
          </Typography.Text>
        </Space>
      </Col>
      <Col>
        <Tooltip title="Copied" visible={copied}>
          <CopyToClipboard text={walletAddress} onCopy={onCopy}>
            <IonIcon name="copy-outline" style={{ cursor: 'pointer' }} />
          </CopyToClipboard>
        </Tooltip>
      </Col>
      <Col>
        <QR address={walletAddress} />
      </Col>
    </Row>
  )
}

export default WalletInfo
