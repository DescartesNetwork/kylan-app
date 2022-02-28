import { useCallback, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useSolana, useWalletKit } from '@gokiprotocol/walletkit'
import { account } from '@senswap/sen-js'
import { BN } from '@project-serum/anchor'

import IonIcon from 'components/ionicon'
import PixelButton from 'components/pixelButton'

import { AppDispatch, AppState } from 'store'
import configs from 'configs'
import { solExplorer } from 'shared/util'
import { setBidAmount } from 'store/bid.reducer'

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
  const {
    main: { mintSelected },
    bid: { bidAmount },
  } = useSelector((state: AppState) => state)

  const onDetectToInitCheque = useCallback(async () => {
    const { kylan } = window.kylan
    if (!kylan) return
    try {
      const chequeAddress = await kylan.deriveChequeAddress(
        printerAddress,
        mintSelected,
      )
      const chequeData = await kylan.getChequeData(chequeAddress)
      if (!chequeData)
        return await kylan.initializeCheque(printerAddress, mintSelected)
      // do nothing
    } catch (err) {
      //try to create cheque
      await kylan.initializeCheque(printerAddress, mintSelected)
    }
  }, [mintSelected])

  const onMint = useCallback(async () => {
    const { kylan } = window.kylan
    if (!account.isAddress(mintSelected) || !kylan || !bidAmount) return
    setLoading(true)
    const bidAmountBN = Number(bidAmount) * Math.pow(10, 6)
    const amount = new BN(bidAmountBN)
    try {
      await onDetectToInitCheque()
      const { txId } =
        (await kylan.print(amount, mintSelected, printerAddress)) || {}
      window.notify({
        type: 'success',
        description: 'Print Kylan token successfully, Click to view details',
        onClick: () => window.open(solExplorer(txId), '_blank'),
      })
      dispatch(setBidAmount(''))
    } catch (err: any) {
      window.notify({ type: 'error', description: err.message })
    } finally {
      setLoading(false)
    }
  }, [bidAmount, dispatch, mintSelected, onDetectToInitCheque])

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
}

const MintAction = () => {
  const { connected } = useSolana()

  if (connected) return <MintToken />
  return <ConnectWallet />
}

export default MintAction
