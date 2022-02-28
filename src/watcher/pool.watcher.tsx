import { Fragment, useCallback, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { account, DEFAULT_SWAP_PROGRAM_ADDRESS } from '@senswap/sen-js'
import { useSolana } from '@gokiprotocol/walletkit'
import schema_1 from '@senswap/sen-js/dist/schema'

import { getPools, PoolsState, upsetPool } from 'store/pools.reducer'
import configs from 'configs'
import { AppDispatch } from 'store'

const soproxABI = require('soprox-abi')

const {
  sol: { taxmanAddress },
} = configs

// Watch id
let watchId = 0

const PoolWatcher = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { publicKey, provider } = useSolana()

  const parsePoolData = (data: Buffer) => {
    const layout = new soproxABI.struct(schema_1.POOL_SCHEMA)
    if (data.length !== layout.space) return null
    layout.fromBuffer(data)
    return layout.value
  }

  // First-time fetching
  const fetchData = useCallback(async () => {
    try {
      if (!publicKey) return
      const pools = await provider.connection.getProgramAccounts(
        account.fromAddress(DEFAULT_SWAP_PROGRAM_ADDRESS),
      )

      let bulk: PoolsState = {}
      pools.forEach(({ pubkey, account: { data: buf } }) => {
        const address = pubkey.toBase58()
        const data = parsePoolData(buf)
        if (data) bulk[address] = data
      })
      await dispatch(getPools({ bulk }))
    } catch (er) {
      return window.notify({
        type: 'error',
        description: 'Cannot fetch data of pools',
      })
    }
  }, [dispatch, provider.connection, publicKey])
  // Watch account changes
  const watchData = useCallback(async () => {
    if (watchId) return console.warn('Already watched')
    const { swap } = window.sentre || {}
    const filters = [{ memcmp: { bytes: taxmanAddress, offset: 65 } }]
    watchId = swap?.watch((er: string | null, re: any) => {
      if (er) return console.error(er)
      const { address, data } = re
      return dispatch(upsetPool({ address, data }))
    }, filters)
  }, [dispatch])

  useEffect(() => {
    fetchData()
    // watchData()
    // Unwatch (cancel socket)
    return () => {
      ;(async () => {
        try {
          await window.sentre.swap.unwatch(watchId)
        } catch (er) {}
      })()
      watchId = 0
    }
  }, [fetchData, watchData])

  return <Fragment />
}

export default PoolWatcher
