import { useCallback, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { account, utils } from '@senswap/sen-js'
import { useSolana } from '@gokiprotocol/walletkit'

import {
  Row,
  Col,
  Button,
  Space,
  Popover,
  Typography,
  Avatar,
  Tooltip,
} from 'antd'
import IonIcon from 'components/ionicon'
import Network from './network'
import WalletAvatar from './walletAvatar'

import { useAccount } from 'providers'
import { setAvailable, setKylanBalance } from 'store/main.reducer'
import { AppState, AppDispatch } from 'store'
import { disconnectWallet } from 'store/wallet.reducer'
import useMintDecimals from 'hook/useMintDecimal'
import { numeric, shortenAddress } from 'shared/util'
import configs from 'configs'
import { KUSD_DECIMAL } from 'constant'

import logo from 'static/images/logo/logo-mobile.svg'
import './index.less'

const {
  sol: { printerAddress },
} = configs

const ActionCenter = () => {
  const dispatch = useDispatch<AppDispatch>()
  const {
    main: { mintSelected, kylanBalance },
    wallet: { lamports, address: walletAddress },
  } = useSelector((state: AppState) => state)
  const { disconnect } = useSolana()
  const { accounts } = useAccount()
  const secureDecimal = useMintDecimals(mintSelected) || 0

  const onDisconnectWallet = useCallback(async () => {
    await disconnect()
    await dispatch(disconnectWallet())
  }, [disconnect, dispatch])

  const getKylanBalance = useCallback(async () => {
    const { kylan } = window.kylan
    if (!account.isAddress(mintSelected)) return
    const { mint: secureAddress, amount } =
      Object.values(accounts).find(({ mint }) => mint === mintSelected) || {}
    if (!account.isAddress(secureAddress) || !amount) return
    const accountBalance = Number(utils.undecimalize(amount, secureDecimal))
    console.log(amount, accountBalance, 'ss')
    try {
      const chequeAddress = await kylan.deriveChequeAddress(
        printerAddress,
        secureAddress,
      )
      const { amount } = await kylan.getChequeData(chequeAddress)
      const balance = amount.toNumber() / 10 ** KUSD_DECIMAL
      dispatch(setKylanBalance(balance))
      dispatch(setAvailable(accountBalance))
    } catch (err: any) {
      setKylanBalance(0)
    }
  }, [accounts, dispatch, mintSelected, secureDecimal])

  useEffect(() => {
    getKylanBalance()
  }, [getKylanBalance])

  return (
    <Space className="wallet-center">
      <Tooltip title={kylanBalance}>
        <Space className="kylan-balance" size={12}>
          <Avatar size={24} src={logo} />
          <Typography.Text>
            {numeric(kylanBalance).format('0,0.[000]a')}
          </Typography.Text>
        </Space>
      </Tooltip>
      <Popover
        trigger="click"
        placement="bottomRight"
        content={
          <Row gutter={[16, 16]} style={{ maxWidth: 194 }}>
            <Col span={24}>
              <Network />
            </Col>
            <Col span={24}>
              <Space
                size={15}
                style={{ cursor: 'pointer' }}
                onClick={onDisconnectWallet}
              >
                <IonIcon className="action-center-icon " name="power-outline" />
                <Typography.Text>Disconnect</Typography.Text>
              </Space>
            </Col>
          </Row>
        }
      >
        <Button className="wallet-balance">
          <Tooltip title={utils.undecimalize(lamports, 9)}>
            <Space>
              <WalletAvatar />
              <span>
                ◎ {numeric(utils.undecimalize(lamports, 9)).format('0,0.[00]a')}
              </span>
              {shortenAddress(walletAddress, 3, '...')}
            </Space>
          </Tooltip>
        </Button>
      </Popover>
    </Space>
  )
}

export default ActionCenter
