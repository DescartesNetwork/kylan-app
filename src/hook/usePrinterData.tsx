import configs from 'configs'
import { useCallback, useEffect, useState } from 'react'

const {
  sol: { printerAddress },
} = configs

const usePrinterData = () => {
  const [authority, setAuthority] = useState('')
  const [stableAddress, setStableAddress] = useState('')

  const getPrinterData = useCallback(async () => {
    const { kylan } = window.kylan
    const { authority, stableToken } = await kylan.getPrinterData(
      printerAddress,
    )
    setAuthority(authority.toBase58())
    return setStableAddress(stableToken.toBase58())
  }, [])

  useEffect(() => {
    getPrinterData()
  }, [getPrinterData])

  return { authority, stableAddress }
}

export default usePrinterData
