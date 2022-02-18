import { ReactNode } from 'react'

type PropsType = {
  children?: ReactNode
}

const PixelCard = (props: PropsType) => {
  const { children } = props

  return (
    <div className="pixel-card">
      <div className="pixel-card-border" />
      <div className="pixel-card-content">{children}</div>
    </div>
  )
}

export default PixelCard
