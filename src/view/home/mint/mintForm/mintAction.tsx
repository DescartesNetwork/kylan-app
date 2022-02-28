import { useCallback, useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useSolana, useWalletKit } from '@gokiprotocol/walletkit'
import { account } from '@senswap/sen-js'
import { BN } from '@project-serum/anchor'

import IonIcon from 'components/ionicon'
import PixelButton from 'components/pixelButton'

import useMintDecimals from 'hook/useMintDecimal'
import { AppDispatch, AppState } from 'store'
import configs from 'configs'
import { explorer } from 'shared/util'
import { setBidAmount } from 'store/bid.reducer'
import { getCheque } from 'store/cheque.reducer'

const {
  sol: { printerAddress },
} = configs

const ConnectWallet = () => {
  const { connect } = useWalletKit()

  return (
    <PixelButton
      onClick={connect}
      suffix={<IonIcon name="wallet-outline" />}
      block
    >
      Connect wallet
    </PixelButton>
  )
}

const MintToken = () => {
  const dispatch = useDispatch<AppDispatch>()
  const [loading, setLoading] = useState(false)
  const [approved, setApproved] = useState(false)
  const {
    main: { mintSelected },
    bid: { bidAmount },
    cheques,
  } = useSelector((state: AppState) => state)
  const secureDecimals = useMintDecimals(mintSelected) || 0

  const onInitCheque = useCallback(async () => {
    const { kylan } = window.kylan
    setLoading(true)
    try {
      const { txId, chequeAddress } = await kylan.initializeCheque(
        printerAddress,
        mintSelected,
      )
      await dispatch(getCheque({ address: chequeAddress }))
      return window.notify({
        type: 'success',
        description: 'Successfully approve the token',
        onClick: () => window.open(explorer(txId), '_blank'),
      })
    } catch (er: any) {
      return window.notify({ type: 'error', description: er.message })
    } finally {
      return setLoading(false)
    }
  }, [dispatch, mintSelected])

  const onDetectCertificate = useCallback(async () => {
    const { kylan } = window.kylan
    try {
      const chequeAddress = await kylan.deriveChequeAddress(
        printerAddress,
        mintSelected,
      )
      setApproved(!!cheques[chequeAddress])
    } catch (err) {
      setApproved(false)
    }
  }, [mintSelected, cheques])

  const onMint = useCallback(async () => {
    if (!account.isAddress(mintSelected) || !Number(bidAmount)) return
    setLoading(true)
    const amount = new BN(Number(bidAmount) * 10 ** secureDecimals)
    try {
      const { kylan } = window.kylan
      const { txId } = await kylan.print(amount, mintSelected, printerAddress)
      window.notify({
        type: 'success',
        description: 'Print KUSD tokens successfully. Click to view details.',
        onClick: () => window.open(explorer(txId), '_blank'),
      })
      dispatch(setBidAmount(''))
    } catch (err: any) {
      window.notify({ type: 'error', description: err.message })
    } finally {
      setLoading(false)
    }
  }, [bidAmount, dispatch, mintSelected, secureDecimals])

  useEffect(() => {
    onDetectCertificate()
  }, [onDetectCertificate])

  if (approved)
    return (
      <PixelButton
        onClick={onMint}
        suffix={<IonIcon name="wallet-outline" />}
        loading={loading}
        block
      >
        Mint
      </PixelButton>
    )

  return (
    <PixelButton
      onClick={onInitCheque}
      suffix={<IonIcon name="wallet-outline" />}
      loading={loading}
      block
    >
      Approve
    </PixelButton>
  )
}

const MintAction = () => {
  const { connected } = useSolana()

  if (connected) return <MintToken />
  return <ConnectWallet />
}

export default MintAction
