import { Space, Typography } from 'antd'
import { MintAvatar, MintSymbol } from 'shared/antd/mint'

const AccountItem = ({ mintAddress }: { mintAddress: string }) => {
  return (
    <Space>
      <MintAvatar mintAddress={mintAddress} size={24} />
      <Typography.Text className="caption">
        <MintSymbol mintAddress={mintAddress} />
      </Typography.Text>
    </Space>
  )
}

export default AccountItem
