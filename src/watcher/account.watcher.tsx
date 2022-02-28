import { Fragment, useCallback, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { account, DEFAULT_SPLT_PROGRAM_ADDRESS } from '@senswap/sen-js'
import { useSolana } from '@gokiprotocol/walletkit'
import schema_1 from '@senswap/sen-js/dist/schema'

import { AccountsState, getAccounts } from 'store/accounts.reducer'
import { AppDispatch } from 'store'

const soproxABI = require('soprox-abi')

// Watch id
let watchId = 0
// let prevLamports: BigInt | undefined = undefined

const AccountWatcher = () => {
  const dispatch = useDispatch<AppDispatch>()
  // const [lamports, setLamports] = useState<BigInt>(BigInt(0))
  const { publicKey, provider } = useSolana()
  const walletAddress = publicKey?.toBase58() || ''

  // const getLamports = useCallback(async () => {
  //   if (!publicKey) return
  //   const balance = await provider.connection.getBalance(publicKey)
  //   setLamports(BigInt(balance))
  // }, [provider, publicKey])

  // useEffect(() => {
  //   getLamports()
  // }, [getLamports])

  const parseAccountData = (data: Buffer) => {
    const layout = new soproxABI.struct(schema_1.ACCOUNT_SCHEMA)
    if (data.length !== layout.space) throw new Error('Unmatched buffer length')
    layout.fromBuffer(data)
    return layout.value
  }

  // First-time fetching
  const fetchData = useCallback(async () => {
    try {
      if (!account.isAddress(walletAddress) || !publicKey) return
      const { value } =
        (await provider.connection.getTokenAccountsByOwner(publicKey, {
          programId: account.fromAddress(DEFAULT_SPLT_PROGRAM_ADDRESS),
        })) || {}
      let bulk: AccountsState = {}
      value.forEach(({ pubkey, account: { data: buf } }) => {
        const address = pubkey.toBase58()
        const data = parseAccountData(buf)
        return (bulk[address] = data)
      })
      await dispatch(getAccounts({ bulk })).unwrap()
    } catch (er) {
      return window.notify({
        type: 'error',
        description: 'Cannot fetch data of accounts',
      })
    }
  }, [dispatch, provider.connection, publicKey, walletAddress])
  // Watch account changes
  // const watchData = useCallback(async () => {
  //   if (!account.isAddress(walletAddress))
  //     return console.warn('Wallet is not connected')
  //   if (watchId) return console.warn('Already watched')
  //   const { splt } = window.sentre || {}
  //   const filters = [{ memcmp: { bytes: walletAddress, offset: 32 } }]
  //   watchId = splt?.watch((er: string | null, re: any) => {
  //     if (er) return console.error(er)
  //     const { address, data } = re
  //     return dispatch(upsetAccount({ address, data }))
  //   }, filters)
  // }, [dispatch, walletAddress])

  // When we close accounts, there a high chance
  // that the next balance will be greater than the current balance
  // We use this trick to reload relevant list
  // useEffect(() => {
  //   if (typeof prevLamports !== 'undefined' && lamports > prevLamports) {
  //     dispatch(getAccounts({ owner: walletAddress }))
  //   }
  //   prevLamports = lamports
  // }, [dispatch, walletAddress, lamports])

  useEffect(() => {
    fetchData()
    // watchData()
    // Unwatch (cancel socket)
    return () => {
      ;(async () => {
        try {
          await window.sentre.splt.unwatch(watchId)
        } catch (er) {}
      })()
      watchId = 0
    }
  }, [fetchData])

  return <Fragment />
}

export default AccountWatcher
