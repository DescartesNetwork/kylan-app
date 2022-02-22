import {
  createContext,
  useContext,
  Children,
  cloneElement,
  Component,
  forwardRef,
  ReactNode,
  useMemo,
  CSSProperties,
} from 'react'
import { useSelector } from 'react-redux'

import { ConfigProvider } from 'antd'

import { AppState } from 'store'
import { UIState } from 'store/ui.reducer'
import { ConfigProviderProps } from 'antd/lib/config-provider'

const Context = createContext<UIProvider>({} as UIProvider)

export type UIProvider = {
  ui: UIState
}

/**
 * UI Context Provider
 */
const UIContextProvider = ({
  children,
  style = {},
  antd = false,
}: {
  children: ReactNode
  style?: CSSProperties
  antd?: boolean | ConfigProviderProps
}) => {
  const { ui } = useSelector((state: AppState) => state)
  const provider = useMemo(() => ({ ui }), [ui])
  const configProvider = {
    getPopupContainer: () => document.getElementById('root') as HTMLElement,
    ...{},
  }
  return (
    <Context.Provider value={provider}>
      <section
        style={{ height: '100%', backgroundColor: 'transparent', ...style }}
      >
        <ConfigProvider {...configProvider}>{children}</ConfigProvider>
      </section>
    </Context.Provider>
  )
}
export default UIContextProvider

/**
 * UI Context Consumer
 */
const UIComsumer = ({ children }: { children: JSX.Element }) => {
  return (
    <Context.Consumer>
      {(value) =>
        Children.map(children, (child) => cloneElement(child, { ...value }))
      }
    </Context.Consumer>
  )
}

/**
 * UI HOC
 */
export const withUI = (WrappedComponent: typeof Component) => {
  class HOC extends Component<any, any> {
    render() {
      const { forwardedRef, ...rest } = this.props
      return (
        <UIComsumer>
          <WrappedComponent ref={forwardedRef} {...rest} />
        </UIComsumer>
      )
    }
  }
  return forwardRef<HTMLElement, any>((props, ref) => (
    <HOC {...props} ref={ref} />
  ))
}

/**
 * UI Hook
 */
export const useUI = () => {
  return useContext<UIProvider>(Context)
}
