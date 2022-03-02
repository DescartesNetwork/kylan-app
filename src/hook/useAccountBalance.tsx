import { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { utils } from '@senswap/sen-js'

import { AppState } from 'store'
import { useAccount } from 'providers'
import useMintDecimals from './useMintDecimal'

const useAccountBalance = () => {
  const {
    main: { mintSelected },
  } = useSelector((state: AppState) => state)
  const { accounts } = useAccount()
  const secureDecimal = useMintDecimals(mintSelected) || 0

  const { amount: accountAmount } =
    Object.values(accounts).find(({ mint }) => mint === mintSelected) || {}

  return useMemo(() => {
    if (!accountAmount) return 0
    return Number(utils.undecimalize(accountAmount, secureDecimal))
  }, [accountAmount, secureDecimal])
}

export default useAccountBalance
