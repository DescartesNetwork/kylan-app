import { Fragment, useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { AppDispatch, AppState } from 'store'
import { getAccounts, upsetAccount } from 'store/accounts.reducer'
import { isWalletAddress } from 'shared/util'

// Watch id
let watchId = 0
let prevLamports: BigInt | undefined = undefined

const AccountWatcher = () => {
  const dispatch = useDispatch<AppDispatch>()
  const {
    wallet: { address: walletAddress, lamports },
  } = useSelector((state: AppState) => state)

  // First-time fetching
  const fetchData = useCallback(async () => {
    try {
      if (!isWalletAddress(walletAddress)) return
      await dispatch(getAccounts({ owner: walletAddress })).unwrap()
    } catch (er) {
      return window.notify({
        type: 'error',
        description: 'Cannot fetch data of accounts',
      })
    }
  }, [dispatch, walletAddress])
  // Watch account changes
  const watchData = useCallback(async () => {
    if (!isWalletAddress(walletAddress))
      return console.warn('Wallet is not connected')
    if (watchId) return console.warn('Already watched')
    const { splt } = window.kylan
    const filters = [{ memcmp: { bytes: walletAddress, offset: 32 } }]
    watchId = splt?.watch((er: string | null, re: any) => {
      if (er) return console.error(er)
      const { address, data } = re
      return dispatch(upsetAccount({ address, data }))
    }, filters)
  }, [dispatch, walletAddress])

  // When we close accounts, there a high chance
  // that the next balance will be greater than the current balance
  // We use this trick to reload relevant list
  useEffect(() => {
    if (typeof prevLamports !== 'undefined' && lamports > prevLamports) {
      dispatch(getAccounts({ owner: walletAddress }))
    }
    prevLamports = lamports
  }, [dispatch, walletAddress, lamports])

  useEffect(() => {
    fetchData()
    watchData()
    // Unwatch (cancel socket)
    return () => {
      ;(async () => {
        try {
          await window.kylan.splt.unwatch(watchId)
        } catch (er) {}
      })()
      watchId = 0
    }
  }, [fetchData, watchData])

  return <Fragment />
}

export default AccountWatcher
