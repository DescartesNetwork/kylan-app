import { useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { account, utils } from '@senswap/sen-js'

import { AppState } from 'store'

const usePrinterBalance = () => {
  const [printerTVL, setPrinterTVL] = useState('0')
  const {
    printer: { stableToken },
  } = useSelector((state: AppState) => state)

  const getPrinterTVl = useCallback(async () => {
    if (!account.isAddress(stableToken)) return setPrinterTVL('0')
    const { splt } = window.kylan
    try {
      const { supply, decimals } = await splt.getMintData(stableToken)
      const tvl = utils.undecimalize(supply, decimals)
      return setPrinterTVL(tvl)
    } catch (err) {
      return setPrinterTVL('0')
    }
  }, [stableToken])

  useEffect(() => {
    getPrinterTVl()
  }, [getPrinterTVl])

  return { printerTVL }
}

export default usePrinterBalance
