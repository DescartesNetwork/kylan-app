import { useCallback, useEffect, useState } from 'react'
import Kylan, { AnchorWallet } from '@project-kylan/core'
import { useSolana } from '@gokiprotocol/walletkit'

let rootKylan: any = null

const useKylan = () => {
  const [kylan, setKylan] = useState<Kylan>()
  const { wallet } = useSolana()

  const onInitKylan = useCallback(async () => {
    if (!rootKylan) rootKylan = new Kylan(wallet as AnchorWallet)
    setKylan(rootKylan)
  }, [wallet])

  useEffect(() => {
    onInitKylan()
  }, [onInitKylan])

  return kylan
}

export default useKylan
