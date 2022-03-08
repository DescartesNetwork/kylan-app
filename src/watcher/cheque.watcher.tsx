import { Fragment, useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { AppDispatch, AppState } from 'store'
import { filterCheques, getCheques, upsetCheque } from 'store/cheque.reducer'
import { isWalletAddress } from 'shared/util'

// Watch id
let watchId = 0

const ChequeWatcher = () => {
  const dispatch = useDispatch<AppDispatch>()
  const {
    wallet: { address: walletAddress },
    main: { role },
  } = useSelector((state: AppState) => state)

  const fetchData = useCallback(async () => {
    try {
      if (!isWalletAddress(walletAddress)) return
      await dispatch(getCheques())
    } catch (er: any) {
      window.notify({ type: 'error', description: er.message })
    }
  }, [dispatch, walletAddress])

  // Watch cheque changes
  const watchData = useCallback(async () => {
    if (!isWalletAddress(walletAddress))
      return console.warn('Wallet is not connected')
    if (watchId) return console.warn('Already watched')
    const { kylan } = window.kylan
    watchId = kylan?.watch((er: string | null, re: any) => {
      if (er) return console.error(er)
      const { address, data } = re
      return dispatch(upsetCheque({ address, data }))
    }, filterCheques(role))
  }, [dispatch, walletAddress, role])

  useEffect(() => {
    fetchData()
    watchData()
    // Unwatch (cancel socket)
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

export default ChequeWatcher
