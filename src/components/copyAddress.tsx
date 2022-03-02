import { useState } from 'react'
import CopyToClipboard from 'react-copy-to-clipboard'

import { Space, Tooltip, Typography } from 'antd'
import { shortenAddress } from 'shared/util'
import IonIcon from './ionicon'

const CopyAddress = ({ address }: { address: string }) => {
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

export default CopyAddress
