import {
  createContext,
  useContext,
  Children,
  cloneElement,
  Component,
  forwardRef,
  useCallback,
  ReactNode,
  useMemo,
} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { account } from '@senswap/sen-js'

import { AppDispatch, AppState } from 'store'
import { getMint as _getMint, MintsState } from 'store/mints.reducer'
import TokenProvider from './tokenProvider'

const tokenProvider = new TokenProvider()
const Context = createContext<MintProvider>({} as MintProvider)

export type MintProvider = {
  mints: MintsState
  getMint: (...agrs: Parameters<typeof _getMint>) => Promise<MintsState>
  getDecimals: (mintAddress: string) => Promise<number>
  tokenProvider: TokenProvider
}

/**
 * Mint Context Provider
 */
const MintContextProvider = ({ children }: { children: ReactNode }) => {
  const dispatch = useDispatch<AppDispatch>()
  const { mints } = useSelector((state: AppState) => state)
  const getMint = useCallback(
    async (...agrs: Parameters<typeof _getMint>) =>
      await dispatch(_getMint(...agrs)).unwrap(),
    [dispatch],
  )
  const getDecimals = useCallback(
    async (mintAddress: string) => {
      if (!account.isAddress(mintAddress))
        throw new Error('Invalid mint address')
      // If the token is in token provider, return its decimals
      const tokenInfo = await tokenProvider.findByAddress(mintAddress)
      if (tokenInfo?.decimals) return tokenInfo.decimals
      // Fetch from the clustters
      const mintData = await getMint({ address: mintAddress })
      if (mintData[mintAddress]?.decimals) return mintData[mintAddress].decimals
      throw new Error('Cannot find mint decimals')
    },
    [getMint],
  )
  const provider = useMemo(
    () => ({ mints, getMint, getDecimals, tokenProvider }),
    [mints, getMint, getDecimals],
  )
  // Context provider
  return <Context.Provider value={provider}>{children}</Context.Provider>
}
export default MintContextProvider

/**
 * Mint Context Consumer
 */
const MintContextComsumer = ({ children }: { children: JSX.Element }) => {
  return (
    <Context.Consumer>
      {(value) =>
        Children.map(children, (child) => cloneElement(child, { ...value }))
      }
    </Context.Consumer>
  )
}

/**
 * Mint HOC
 */
export const withMint = (WrappedComponent: typeof Component) => {
  class HOC extends Component<any, any> {
    render() {
      const { forwardedRef, ...rest } = this.props
      return (
        <MintContextComsumer>
          <WrappedComponent ref={forwardedRef} {...rest} />
        </MintContextComsumer>
      )
    }
  }
  return forwardRef<HTMLElement, any>((props, ref) => (
    <HOC {...props} ref={ref} />
  ))
}

/**
 * Mint Hook
 */
export const useMint = () => {
  return useContext<MintProvider>(Context)
}
