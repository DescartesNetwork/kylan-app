import { useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { utils } from '@senswap/sen-js'

import { AppState } from 'store'
import { KUSD_DECIMAL } from 'constant'
import configs from 'configs'
import { useAccount } from 'providers'

const {
  sol: { printerAddress },
} = configs

const useChequeBalance = () => {
  const [totalBalance, setTotalBalance] = useState(0)
  const [balance, setBalance] = useState(0)
  const {
    cheques,
    main: { mintSelected },
    wallet: { address: walletAddress },
  } = useSelector((state: AppState) => state)
  const { accounts } = useAccount()

  const getAmountCheque = useCallback(async () => {
    try {
      const { kylan } = window.kylan
      const address = await kylan.deriveChequeAddress(
        printerAddress,
        mintSelected,
      )
      const { amount } = cheques[address] || {}
      if (!amount) return setBalance(0)
      const balance = amount.toNumber() / 10 ** KUSD_DECIMAL
      return setBalance(balance)
    } catch (err) {
      return setBalance(0)
    }
  }, [cheques, mintSelected])

  const getAmountCheques = useCallback(async () => {
    try {
      const { kylan, splt } = window.kylan
      const { stableToken } = await kylan.getPrinterData(printerAddress)
      const mintAddress = stableToken.toBase58()
      const accAddr = await splt.deriveAssociatedAddress(
        walletAddress,
        mintAddress,
      )
      const { amount } = accounts[accAddr]
      if (!amount) return setTotalBalance(0)
      const totalBalance = utils.undecimalize(amount, KUSD_DECIMAL)
      setTotalBalance(Number(totalBalance))
    } catch (err) {
      setTotalBalance(0)
    }
  }, [accounts, walletAddress])

  useEffect(() => {
    getAmountCheque()
  }, [getAmountCheque])

  useEffect(() => {
    getAmountCheques()
  }, [getAmountCheques])

  return { balance, totalBalance }
}

export default useChequeBalance
