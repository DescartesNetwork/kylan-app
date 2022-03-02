import { Fragment, useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { account } from '@senswap/sen-js'

import { AppDispatch, AppState } from 'store'
import { getCertificates, upsetCertificate } from 'store/certificate.reducer'

import configs from 'configs'

const {
  sol: { printerAddress },
} = configs

// Watch id
let watchId = 0

const CertificateWatcher = () => {
  const dispatch = useDispatch<AppDispatch>()
  const {
    wallet: { address: walletAddress },
  } = useSelector((state: AppState) => state)

  const fetchData = useCallback(async () => {
    try {
      if (!account.isAddress(walletAddress)) return
      await dispatch(getCertificates())
    } catch (er: any) {
      window.notify({ type: 'error', description: er.message })
    }
  }, [dispatch, walletAddress])

  // Watch cheque changes
  const watchData = useCallback(async () => {
    if (!account.isAddress(walletAddress))
      return console.warn('Wallet is not connected')
    if (watchId) return console.warn('Already watched')
    const { kylan } = window.kylan
    const filters = [{ memcmp: { bytes: printerAddress, offset: 8 } }]
    watchId = kylan?.watch((er: string | null, re: any) => {
      if (er) return console.error(er)
      const { address, data } = re
      return dispatch(upsetCertificate({ address, data }))
    }, filters)
  }, [dispatch, walletAddress])

  useEffect(() => {
    fetchData()
    watchData()
    // Unwatch (cancel socket) return () => {
    return () => {
      ;(async () => {
        const { kylan } = window.kylan
        try {
          await kylan.unwatch(watchId)
        } catch (er) {}
      })()
      watchId = 0
    }
  }, [fetchData, watchData])

  return <Fragment />
}

export default CertificateWatcher
