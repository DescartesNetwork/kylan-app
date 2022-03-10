import { useCallback, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { account } from '@senswap/sen-js'
import { BN } from '@project-serum/anchor'

import IonIcon from 'components/ionicon'
import PixelButton from 'components/pixelButton'

import useMintDecimals from 'hook/useMintDecimal'
import { AppDispatch, AppState } from 'store'
import { explorer } from 'shared/util'
import { setBidAmount } from 'store/bid.reducer'
import { KUSD_DECIMAL, PayState } from 'constant'
import useAccountBalance from 'hook/useAccountBalance'
import useChequeBalance from 'hook/useChequeBalance'

import configs from 'configs'

const {
  sol: { printerAddress },
} = configs

const PrinterAction = () => {
  const dispatch = useDispatch<AppDispatch>()
  const [loading, setLoading] = useState(false)
  const {
    main: { printerType, mintSelected },
    bid: { bidAmount },
  } = useSelector((state: AppState) => state)
  const secureDecimals = useMintDecimals(mintSelected) || 0
  const accountBalance = useAccountBalance()
  const chequeBalance = useChequeBalance()

  const payback = printerType === PayState.Payback
  const maxBalance = payback ? chequeBalance : accountBalance
  const disabled =
    !account.isAddress(mintSelected) ||
    !Number(bidAmount) ||
    Number(bidAmount) > maxBalance

  const onMint = useCallback(async () => {
    if (disabled) return
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
  }, [bidAmount, disabled, dispatch, mintSelected, secureDecimals])

  const onRedeem = useCallback(async () => {
    if (disabled) return
    setLoading(true)
    const amount = new BN(Number(bidAmount) * 10 ** KUSD_DECIMAL)
    try {
      const { kylan } = window.kylan
      const { txId } = await kylan.burn(amount, mintSelected, printerAddress)
      window.notify({
        type: 'success',
        description: 'Redeem tokens successfully. Click to view details.',
        onClick: () => window.open(explorer(txId), '_blank'),
      })
      dispatch(setBidAmount(''))
    } catch (err: any) {
      window.notify({ type: 'error', description: err.message })
    } finally {
      setLoading(false)
    }
  }, [bidAmount, disabled, dispatch, mintSelected])

  if (!payback)
    return (
      <PixelButton
        onClick={onMint}
        suffix={<IonIcon name="wallet-outline" />}
        loading={loading}
        disabled={disabled}
        block
      >
        Mint
      </PixelButton>
    )
  return (
    <PixelButton
      onClick={onRedeem}
      suffix={<IonIcon name="wallet-outline" />}
      loading={loading}
      disabled={disabled}
      block
    >
      Redeem
    </PixelButton>
  )
}

export default PrinterAction
