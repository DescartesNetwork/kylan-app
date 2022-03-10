import {
  ChangeEvent,
  useState,
  forwardRef,
  useCallback,
  useRef,
  InputHTMLAttributes,
  CSSProperties,
} from 'react'

import { Tooltip, Space } from 'antd'
import IonIcon from 'components/ionicon'

let timeoutId: ReturnType<typeof setTimeout> | undefined

/**
 * Numeric Input
 * - Check balance based on the max
 * - Only accept numeric characters
 * @remarks The props of input follows the same as https://ant.design/components/input/#API. Extra & Overrided props
 * @param max - Maximum
 * @param onValue - A triggerred function if a valid number
 */
const NumericFreeSizeInput = forwardRef(
  (
    {
      max,
      onChange = () => {},
      style = {},
      className = 'wrap-input',
      bodyClass = 'body-input',
      ...props
    }: InputHTMLAttributes<HTMLInputElement> & {
      onChange?: (val: string) => void
      max?: string | number
      style?: CSSProperties
      className?: string
      bodyClass?: string
    },
    ref: any,
  ) => {
    const [error, setError] = useState('')
    const [cursor, setCursor] = useState<number | null>(null)
    const innerRef = useRef(ref)

    // Handle amount
    const onAmount = useCallback(
      (val: string) => {
        const onError = (er: string) => {
          if (timeoutId) {
            clearTimeout(timeoutId)
            timeoutId = undefined
          }
          setError(er)
          timeoutId = setTimeout(() => setError(''), 500)
        }
        const reg = /^\d*(\.\d*)?$/
        if (!reg.test(val)) return onError('Invalid character')
        if (max && parseFloat(val) > parseFloat(max.toString()))
          return onError('Not enough balance')
        return onChange(val)
      },
      [max, onChange],
    )

    // Handle cursor jumping
    // To prevent autofocus on mobile, we must strictly check cursor different from null
    if (cursor !== null) innerRef?.current?.setSelectionRange(cursor, cursor)

    const noBorder = { width: '100%', border: 'none', outline: 'none' }

    return (
      <Tooltip
        title={
          <Space>
            <IonIcon name="warning" />
            {error}
          </Space>
        }
        visible={!!error}
      >
        <div className={className}>
          <input
            {...props}
            type="text"
            style={{ ...style, ...noBorder }}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setCursor(e.target.selectionStart)
              onAmount(e.target.value || '')
            }}
            ref={innerRef}
          />
        </div>
      </Tooltip>
    )
  },
)

export default NumericFreeSizeInput
