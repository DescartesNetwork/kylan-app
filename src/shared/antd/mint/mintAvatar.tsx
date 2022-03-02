import { ReactNode, useCallback, useEffect, useState } from 'react'
import { account } from '@senswap/sen-js'

import { Avatar } from 'antd'
import IonIcon from 'components/ionicon'
import { useMint } from 'providers'

export type MintAvatarProps = {
  mintAddress: string
  size?: number
  icon?: ReactNode
}

/**
 * Mint/Token avatar, supporting LP tokens
 * @param mintAddress -  Mint address
 * @param size - Avatar size. Default 24px.
 * @param icon - Fallback icon for unknown token
 * @returns name
 */
const MintAvatar = ({
  mintAddress,
  size = 24,
  icon = <IonIcon name="diamond-outline" />,
  ...props
}: MintAvatarProps) => {
  const [avatar, setAvatar] = useState('')
  const { tokenProvider } = useMint()

  const deriveAvatar = useCallback(
    async (address: string) => {
      const token = await tokenProvider.findByAddress(address)
      if (token?.logoURI) return token.logoURI
      return ''
    },
    [tokenProvider],
  )

  const deriveAvatars = useCallback(async () => {
    if (!account.isAddress(mintAddress)) return setAvatar('')
    const avatar = await deriveAvatar(mintAddress)
    return setAvatar(avatar)
  }, [mintAddress, deriveAvatar])

  useEffect(() => {
    deriveAvatars()
  }, [deriveAvatars])

  return (
    <Avatar
      src={avatar}
      size={size}
      style={{ backgroundColor: '#2D3355', border: 'none' }}
      {...props}
    >
      {icon}
    </Avatar>
  )
}

export default MintAvatar
