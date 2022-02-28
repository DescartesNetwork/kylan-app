import { useEffect, useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { account } from '@senswap/sen-js'
import { useSolana } from '@gokiprotocol/walletkit'

import { AppDispatch } from 'store'
import { initializeWindowKylan, updateWallet } from 'store/wallet.reducer'

// Watch id
let watchId: any = null

const WalletWatcher = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { publicKey, wallet } = useSolana()
  const walletAddress = publicKey?.toBase58()

  const initWindowKylan = useCallback(async () => {
    if (window.kylan?.wallet || !wallet || !account.isAddress(walletAddress))
      return
    await dispatch(initializeWindowKylan({ wallet, walletAddress }))
  }, [dispatch, wallet, walletAddress])

  const watchData = useCallback(async () => {
    if (!account.isAddress(walletAddress)) {
      try {
        await window.kylan.lamports.unwatch(watchId)
      } catch (er) {
        /* Nothing */
      }
      watchId = null
    } else {
      if (watchId) return console.warn('Already watched')
      watchId = window.kylan.lamports.watch(
        walletAddress,
        (er: string | null, re: number | null) => {
          if (er) return console.warn(er)
          return dispatch(updateWallet({ lamports: BigInt(re || 0) }))
        },
      )
    }
  }, [walletAddress, dispatch])

  useEffect(() => {
    initWindowKylan()
  }, [initWindowKylan])

  useEffect(() => {
    watchData()
  }, [watchData])

  return null
}

export default WalletWatcher
