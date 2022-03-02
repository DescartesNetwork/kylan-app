import { Fragment, useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { account } from '@senswap/sen-js'

import { AppDispatch, AppState } from 'store'
import { getCheques, upsetCheque } from 'store/printer.reducer'
import configs from 'configs'

// Watch id
let watchId = 0

const {
  sol: { printerAddress },
} = configs

const PrinterWatcher = () => {
  const dispatch = useDispatch<AppDispatch>()
  const {
    wallet: { address: walletAddress },
  } = useSelector((state: AppState) => state)

  const fetchData = useCallback(async () => {
    try {
      if (!account.isAddress(walletAddress)) return
      await dispatch(getCheques())
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
    const filters = [{ memcmp: { bytes: printerAddress, offset: 16 } }]
    watchId = kylan?.watch((er: string | null, re: any) => {
      if (er) return console.error(er)
      const { address, data } = re
      return dispatch(upsetCheque({ address, data }))
    }, filters)
  }, [dispatch, walletAddress])

  useEffect(() => {
    fetchData()
    watchData()
    return () => {
      ;(async () => {
        const { kylan } = window.kylan
        try {
          await kylan.unwatch(watchId)
        } catch (er) {}
      })()
      watchId = 0
    }
  }, [watchData, fetchData])

  return <Fragment />
}

export default PrinterWatcher
