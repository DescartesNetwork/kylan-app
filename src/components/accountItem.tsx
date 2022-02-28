import { Space, Typography } from 'antd'
import { MintAvatar, MintSymbol } from 'shared/antd/mint'

import { useAccount } from 'providers'

const AccountItem = ({
  accountAddr,
  onClick = () => {},
}: {
  accountAddr: string
  onClick?: (address: string) => void
}) => {
  const {
    accounts: {
      [accountAddr]: { mint },
    },
  } = useAccount()

  return (
    <Space onClick={() => onClick(mint)}>
      <MintAvatar mintAddress={mint} size={24} />
      <Typography.Text className="caption">
        <MintSymbol mintAddress={mint} />
      </Typography.Text>
    </Space>
  )
}

export default AccountItem
