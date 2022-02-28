import { Fragment, useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { account } from '@senswap/sen-js'

import { AppDispatch, AppState } from 'store'
import { getCertificates } from 'store/certificate.reducer'

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

  useEffect(() => {
    fetchData()
    // watchData()
    // Unwatch (cancel socket)
  }, [fetchData])

  return <Fragment />
}

export default CertificateWatcher
