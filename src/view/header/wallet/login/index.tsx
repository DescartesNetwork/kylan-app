import { useDispatch, useSelector } from 'react-redux'

import { Modal } from 'antd'
import WalletConnection from './walletConnection'
import IonIcon from 'components/ionicon'

import { AppDispatch, AppState } from 'store'
import { closeWallet } from 'store/wallet.reducer'
import './index.os.less'

const Login = () => {
  const { visible } = useSelector((state: AppState) => state.wallet)
  const dispatch = useDispatch<AppDispatch>()
  return (
    <Modal
      visible={visible}
      onCancel={() => dispatch(closeWallet())}
      closeIcon={<IonIcon name="close" />}
      footer={null}
      bodyStyle={{ padding: 24 }}
    >
      <WalletConnection />
    </Modal>
  )
}

export default Login
