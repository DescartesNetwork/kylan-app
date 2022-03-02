import { useCallback, useEffect, useState } from 'react'
import { account } from '@senswap/sen-js'
import { useMint } from 'providers'

const DEFAULT_NAME = 'Unknown Token'

/**
 * Mint/Token name, supporting LP tokens
 * @param mintAddress -  Mint address
 * @returns name
 */
const MintName = ({ mintAddress }: { mintAddress: string }) => {
  const [name, setName] = useState(DEFAULT_NAME)
  const { tokenProvider } = useMint()

  const deriveName = useCallback(
    async (address: string) => {
      const token = await tokenProvider.findByAddress(address)
      if (token?.name) return token.name
      return DEFAULT_NAME
    },
    [tokenProvider],
  )

  const deriveNames = useCallback(async () => {
    if (!account.isAddress(mintAddress)) return setName(DEFAULT_NAME)

    // Normal mint
    const name = await deriveName(mintAddress)
    return setName(name)
  }, [mintAddress, deriveName])

  useEffect(() => {
    deriveNames()
  }, [deriveNames])

  return <span>{name}</span>
}

export default MintName
