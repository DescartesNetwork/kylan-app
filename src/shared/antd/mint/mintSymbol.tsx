import { useCallback, useEffect, useState } from 'react'
import { account } from '@senswap/sen-js'
import { useMint } from 'providers'

const DEFAULT_SYMBOL = 'TOKN'

/**
 * Mint/Token symbol
 * @param mintAddress -  Mint address
 * @returns symbol
 */
const MintSymbol = ({ mintAddress }: { mintAddress: string }) => {
  const [symbol, setSymbol] = useState(DEFAULT_SYMBOL)
  const { tokenProvider } = useMint()

  const deriveSymbol = useCallback(
    async (address: string) => {
      const token = await tokenProvider.findByAddress(address)
      if (token?.symbol) return token.symbol
      return address.substring(0, 4)
    },
    [tokenProvider],
  )

  const deriveSymbols = useCallback(async () => {
    if (!account.isAddress(mintAddress)) return setSymbol(DEFAULT_SYMBOL)
    // Normal mint
    const symbol = await deriveSymbol(mintAddress)
    return setSymbol(symbol)
  }, [mintAddress, deriveSymbol])

  useEffect(() => {
    deriveSymbols()
  }, [deriveSymbols])

  return <span>{symbol}</span>
}

export default MintSymbol
