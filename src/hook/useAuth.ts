import { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { account } from '@senswap/sen-js'
import { web3 } from '@project-serum/anchor'

import configs from 'configs'
import { AppState } from 'store'
import usePrinterData from 'hook/usePrinterData'

const {
  admin: { adminAddresses },
} = configs

export const EMPTY_ADDRESS = web3.SystemProgram.programId.toBase58()

const useAuth = () => {
  const {
    wallet: { address: walletAddress },
  } = useSelector((state: AppState) => state)
  const { authority } = usePrinterData()

  const authenticated = useMemo(() => {
    if (
      account.isAddress(walletAddress) &&
      walletAddress !== EMPTY_ADDRESS &&
      [...adminAddresses, authority].includes(walletAddress)
    )
      return true
    return false
  }, [walletAddress, authority])

  return authenticated
}

export default useAuth
