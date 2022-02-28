import { Fragment, useCallback, useState } from 'react'
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
import { Col, Row, Typography } from 'antd'

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
  const [isExistCheque, setIsExistCheque] = useState(true)
  const {
    main: { mintSelected },
    bid: { bidAmount },
  } = useSelector((state: AppState) => state)

  const onInitCheque = useCallback(async () => {
    const { kylan } = window.kylan
    setLoading(true)
    try {
      await kylan.initializeCheque(printerAddress, mintSelected)
      setIsExistCheque(true)
    } catch (err) {
      // do notthing
    } finally {
      setLoading(false)
    }
  }, [mintSelected])

  const onDetectToInitCheque = useCallback(async () => {
    const { kylan } = window.kylan
    try {
      const chequeAddress = await kylan.deriveChequeAddress(
        printerAddress,
        mintSelected,
      )
      await kylan.getChequeData(chequeAddress)
      setIsExistCheque(true)
    } catch (err) {
      setIsExistCheque(false)
    }
  }, [mintSelected])

  const onMint = useCallback(async () => {
    if (!account.isAddress(mintSelected) || !bidAmount) return
    setLoading(true)
    const bidAmountBN = Number(bidAmount) * Math.pow(10, 6)
    const amount = new BN(bidAmountBN)
    try {
      await onDetectToInitCheque()
      const { kylan } = window.kylan
      const { txId } = await kylan.print(amount, mintSelected, printerAddress)
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
    <Fragment>
      {isExistCheque ? (
        <PixelButton
          onClick={onMint}
          suffix={<IonIcon name="wallet-outline" />}
          loading={loading}
          block
        >
          Mint
        </PixelButton>
      ) : (
        <Row gutter={[8, 8]}>
          <Col span={24}>
            <Typography.Text type="secondary" className="caption">
              <IonIcon name="alert-circle-outline" />
              Don't have cheque yet. Plesea approve create new one to continue
            </Typography.Text>
          </Col>
          <Col span={24}>
            <PixelButton
              onClick={onInitCheque}
              suffix={<IonIcon name="wallet-outline" />}
              loading={loading}
              block
            >
              Approve
            </PixelButton>
          </Col>
        </Row>
      )}
    </Fragment>
  )
}

const MintAction = () => {
  const { connected } = useSolana()

  if (connected) return <MintToken />
  return <ConnectWallet />
}

export default MintAction
