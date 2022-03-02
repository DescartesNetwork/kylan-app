import { CSSProperties, ReactNode, useMemo } from 'react'

import { Space } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'

type PixelButtonProps = {
  suffix?: ReactNode
  loading?: boolean
  onClick?: () => void
  children?: ReactNode
  prefix?: ReactNode
  block?: boolean
  style?: CSSProperties
  disabled?: boolean
}

const PixelButton = (props: PixelButtonProps) => {
  const { suffix, prefix, children, loading, block, disabled, style, ...rest } =
    props

  const _suffix = useMemo(() => {
    if (loading) return <LoadingOutlined />
    return suffix
  }, [loading, suffix])

  const _width = block ? 'calc(100% - 4px)' : 'auto'

  const _disabled = loading || disabled
  const _cursor = _disabled ? 'no-drop' : 'pointer'

  return (
    <button
      className="pixel-btn"
      style={{ ...style, width: _width, cursor: _cursor }}
      disabled={_disabled}
      {...rest}
    >
      <Space>
        {_suffix && <span>{_suffix}</span>}
        <span>{children}</span>
        {prefix && <span>{prefix}</span>}
      </Space>
    </button>
  )
}

export default PixelButton
