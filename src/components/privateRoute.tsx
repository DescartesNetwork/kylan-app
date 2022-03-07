import { ComponentProps, ElementType, useCallback } from 'react'
import { Route, Redirect, useLocation } from 'react-router-dom'

import useAuth from 'hook/useAuth'

export type PrivateRouteProps = {
  component: ElementType
} & ComponentProps<typeof Route>

const PrivateRoute = ({ component: Component, ...rest }: PrivateRouteProps) => {
  const { pathname } = useLocation()
  const authenticated = useAuth()

  const render = useCallback(
    (props) => {
      const redirect = encodeURIComponent(pathname)
      if (!authenticated) return <Redirect to={'/home?redirect=' + redirect} />
      return <Component {...props} />
    },
    [Component, pathname, authenticated],
  )

  return <Route {...rest} render={render} />
}

export default PrivateRoute
