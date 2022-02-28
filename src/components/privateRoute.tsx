import { ComponentProps, ElementType, Fragment, useCallback } from 'react'
import { Route, Redirect } from 'react-router-dom'
import { account } from '@senswap/sen-js'
import { useSolana } from '@gokiprotocol/walletkit'

export type PrivateRouteProps = {
  component: ElementType
} & ComponentProps<typeof Route>

const ADDMIN_ADDRESS = 'BkLRcJucoTF9GnxQUa94fkqZdoL9LTWCoT5gF54zVsJk'

const PrivateRoute = ({ component: Component, ...rest }: PrivateRouteProps) => {
  const { publicKey } = useSolana()
  const walletAddress = publicKey?.toBase58() || ''

  const render = useCallback(
    (props) => {
      if (!account.isAddress(walletAddress)) return <Fragment />
      if (walletAddress !== ADDMIN_ADDRESS) return <Redirect to={'/'} />
      return <Component {...props} />
    },
    [walletAddress, Component],
  )

  return <Route {...rest} render={render} />
}

export default PrivateRoute
