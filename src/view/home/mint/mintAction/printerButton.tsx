import { useCallback, useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import IonIcon from 'components/ionicon'
import PixelButton from 'components/pixelButton'
import PrinterAction from './printerAction'

import { AppDispatch, AppState } from 'store'
import configs from 'configs'
import { explorer } from 'shared/util'
import { getCheque } from 'store/cheque.reducer'

const {
  sol: { printerAddress },
} = configs

const PrinterButton = () => {
  const dispatch = useDispatch<AppDispatch>()
  const [loading, setLoading] = useState(false)
  const [approved, setApproved] = useState(false)
  const {
    main: { mintSelected },
    cheques,
  } = useSelector((state: AppState) => state)

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

  useEffect(() => {
    onDetectCertificate()
  }, [onDetectCertificate])

  if (approved) return <PrinterAction />

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

export default PrinterButton
