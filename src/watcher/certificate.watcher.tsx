import { Fragment, useCallback, useEffect } from 'react'
import { useDispatch } from 'react-redux'

import { AppDispatch } from 'store'
import useKylan from 'hook/useKylan'
import { useAccount } from 'providers'
import configs from 'configs'

const {
  sol: { printerAddress },
} = configs

// Watch id
let watchId = 0
// let prevLamports: BigInt | undefined = undefined

const CertificateWatcher = () => {
  const dispatch = useDispatch<AppDispatch>()
  const kylan = useKylan()
  const { accounts } = useAccount()

  const fetchData = useCallback(() => {}, [])

  const getCertAddress = useCallback(async () => {
    if (!kylan || !accounts) return
    try {
      const listMints = Object.values(accounts).map(({ mint }) => mint)
      const promise = listMints.map((mint) => {
        return kylan.deriveCertAddress(printerAddress, mint)
      })
      const listCertAddress = await Promise.all(promise)
      // setCertAddress(listCertAddress)
    } catch (err: any) {
      window.notify({ type: 'error', description: err.message })
    }
  }, [accounts, kylan])

  useEffect(() => {
    getCertAddress()
  }, [getCertAddress])

  useEffect(() => {
    fetchData()
    // watchData()
    // Unwatch (cancel socket)
    return () => {
      ;(async () => {
        try {
          await window.kylan.splt.unwatch(watchId)
        } catch (er) {}
      })()
      watchId = 0
    }
  }, [fetchData])

  return <Fragment />
}

export default CertificateWatcher
