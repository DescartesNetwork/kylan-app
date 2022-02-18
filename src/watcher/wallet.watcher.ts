import { useEffect, useCallback } from 'react'
import { account } from '@senswap/sen-js'

import { AppDispatch, AppState } from 'store'
import { updateWallet } from 'store/wallet.reducer'
import { useDispatch, useSelector } from 'react-redux'

// Watch id
let watchId: any = null

const WalletWatcher = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { address } = useSelector((state: AppState) => state.wallet)

  const watchData = useCallback(async () => {
    if (!account.isAddress(address)) {
      try {
        await window.sentre.lamports.unwatch(watchId)
      } catch (er) {
        /* Nothing */
      }
      watchId = null
    } else {
      if (watchId) return console.warn('Already watched')
      watchId = window.sentre.lamports.watch(
        address,
        (er: string | null, re: number | null) => {
          if (er) return console.warn(er)
          return dispatch(updateWallet({ lamports: BigInt(re || 0) }))
        },
      )
    }
  }, [dispatch, address])

  useEffect(() => {
    watchData()
  }, [watchData])

  return null
}

export default WalletWatcher
