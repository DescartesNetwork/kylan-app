import { useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { account } from '@senswap/sen-js'

import { AppState } from 'store'
import configs from 'configs'

const {
  sol: { printerAddress },
} = configs

const useCeritificateAddress = () => {
  const [certAddress, setCertAddress] = useState('')
  const {
    main: { mintSelected },
  } = useSelector((state: AppState) => state)

  const getCertAddress = useCallback(async () => {
    if (!account.isAddress(mintSelected)) return
    try {
      const { kylan } = window.kylan
      const certAddress = await kylan.deriveCertAddress(
        printerAddress,
        mintSelected,
      )

      setCertAddress(certAddress)
    } catch (err) {
      setCertAddress('')
    }
  }, [mintSelected])

  useEffect(() => {
    getCertAddress()
  }, [getCertAddress])

  return { certAddress }
}
export default useCeritificateAddress
