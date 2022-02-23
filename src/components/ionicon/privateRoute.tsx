import { ComponentProps, ElementType, useCallback } from 'react'
import { Route, Redirect } from 'react-router-dom'
import { account } from '@senswap/sen-js'
import { useSolana } from '@gokiprotocol/walletkit'

export type PrivateRouteProps = {
  component: ElementType
} & ComponentProps<typeof Route>

const PrivateRoute = ({ component: Component, ...rest }: PrivateRouteProps) => {
  const { publicKey } = useSolana()
  const walletAddress = publicKey?.toBase58() || ''

  const render = useCallback(
    (props) => {
      const pathname = encodeURIComponent(
        window.location.href.replace(window.location.origin, ''),
      )
      if (!account.isAddress(walletAddress))
        return <Redirect to={'/welcome?redirect=' + pathname} />
      return <Component {...props} />
    },
    [walletAddress, Component],
  )

  return <Route {...rest} render={render} />
}

export default PrivateRoute
