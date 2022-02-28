import { useEffect, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { account } from '@senswap/sen-js'
import { useSolana } from '@gokiprotocol/walletkit'

import { AppDispatch, AppState } from 'store'
import { initializeWallet, updateWallet } from 'store/wallet.reducer'
import { isAddress } from '@project-kylan/core'

// Watch id
let watchId: any = null

const WalletWatcher = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { publicKey, wallet } = useSolana()
  const {
    wallet: { address: walletAddress },
  } = useSelector((state: AppState) => state)

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
    if (wallet && isAddress(publicKey?.toBase58()))
      dispatch(initializeWallet({ wallet }))
  }, [dispatch, wallet, publicKey])

  useEffect(() => {
    watchData()
  }, [watchData])

  return null
}

export default WalletWatcher
