import { useMemo } from 'react'
import { useSelector } from 'react-redux'

import configs from 'configs'
import { AppState } from 'store'
import { isWalletAddress } from 'shared/util'

const {
  admin: { adminAddresses },
} = configs

const useAuth = () => {
  const {
    wallet: { address: walletAddress },
    printer: { authority },
  } = useSelector((state: AppState) => state)

  const authenticated = useMemo(() => {
    if (
      isWalletAddress(walletAddress) &&
      [...adminAddresses, authority].includes(walletAddress)
    )
      return true
    return false
  }, [walletAddress, authority])

  return authenticated
}

export default useAuth
