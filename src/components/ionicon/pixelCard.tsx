import { CSSProperties, ReactNode } from 'react'

type PropsType = {
  children?: ReactNode
  bodyStyle?: CSSProperties
}

const PixelCard = (props: PropsType) => {
  const { bodyStyle, children } = props

  return (
    <div className="pixel-card">
      <div className="pixel-card-border" />
      <div className="pixel-card-content" style={bodyStyle}>
        {children}
      </div>
    </div>
  )
}

export default PixelCard
