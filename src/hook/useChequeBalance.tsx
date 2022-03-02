import { useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import { AppState } from 'store'
import { KUSD_DECIMAL } from 'constant'
import configs from 'configs'

const {
  sol: { printerAddress },
} = configs

const useChequeBalance = () => {
  const [balance, setBalance] = useState(0)
  const {
    main: { mintSelected },
    cheques,
  } = useSelector((state: AppState) => state)

  const getChequeAmount = useCallback(async () => {
    try {
      const { kylan } = window.kylan
      const address = await kylan.deriveChequeAddress(
        printerAddress,
        mintSelected,
      )
      const { amount } = cheques[address] || {}
      if (!amount) return setBalance(0)
      const balance = amount.toNumber() / 10 ** KUSD_DECIMAL
      setBalance(balance)
    } catch (err) {
      setBalance(0)
    }
  }, [cheques, mintSelected])

  useEffect(() => {
    getChequeAmount()
  }, [getChequeAmount])

  return balance
}

export default useChequeBalance
