import { CSSProperties, ReactNode } from 'react'

type PixelCardProps = {
  children?: ReactNode
  bodyStyle?: CSSProperties
}

const PixelCard = (props: PixelCardProps) => {
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
