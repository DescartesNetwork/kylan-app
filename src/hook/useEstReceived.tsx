import { useMemo } from 'react'
import { useSelector } from 'react-redux'

import useMintDecimals from './useMintDecimal'
import { rate2Price } from 'shared/util'

import { PayState, PRECISION } from 'constant'
import { AppState } from 'store'
import useCeritificateAddress from './useCertificateAddress'

const useEstReceived = () => {
  const {
    bid: { bidAmount },
    main: { printerType, mintSelected },
    certificates,
  } = useSelector((state: AppState) => state)
  const { certAddress } = useCeritificateAddress()
  const { fee, rate } = certificates[certAddress] || {}
  const secureDecimal = useMintDecimals(mintSelected) || 0

  const payback = printerType === PayState.Payback

  return useMemo(() => {
    if (!rate) return 0
    const secure = rate2Price(rate, secureDecimal)
    const estRedeem = Number(bidAmount) * secure
    if (payback) return estRedeem - (estRedeem * fee?.toNumber()) / PRECISION
    return Number(bidAmount) / secure
  }, [bidAmount, fee, payback, rate, secureDecimal])
}

export default useEstReceived
