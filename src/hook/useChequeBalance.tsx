import { useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import { AppState } from 'store'
import { KUSD_DECIMAL } from 'constant'
import configs from 'configs'

const {
  sol: { printerAddress },
} = configs

const useChequeBalance = () => {
  const [totalBalance, setTotalBalance] = useState(0)
  const [balance, setBalance] = useState(0)
  const {
    cheques,
    main: { mintSelected },
    certificates,
  } = useSelector((state: AppState) => state)

  const getAmountCheque = useCallback(
    async (mintAddress: string) => {
      try {
        const { kylan } = window.kylan
        const address = await kylan.deriveChequeAddress(
          printerAddress,
          mintAddress,
        )
        const { amount } = cheques[address] || {}
        if (!amount) return 0
        return amount.toNumber() / 10 ** KUSD_DECIMAL
      } catch (err) {
        return 0
      }
    },
    [cheques],
  )

  const getAmountCheques = useCallback(async () => {
    if (!cheques) return setTotalBalance(0)
    try {
      const secureAddresses = Object.values(certificates).map(
        ({ secureToken }) => secureToken.toBase58(),
      )
      const promises = secureAddresses.map((addr) => getAmountCheque(addr))

      const listTotal = await Promise.all(promises)
      const totalBalance = listTotal.reduce((a, b) => a + b, 0)
      setTotalBalance(totalBalance)
    } catch (err) {
      setTotalBalance(0)
    }
  }, [certificates, cheques, getAmountCheque])

  useEffect(() => {
    ;(async () => {
      const balance = await getAmountCheque(mintSelected)
      return setBalance(balance)
    })()
  }, [getAmountCheque, mintSelected])

  useEffect(() => {
    getAmountCheques()
  }, [getAmountCheques])

  return { getAmountCheque, balance, totalBalance }
}

export default useChequeBalance
