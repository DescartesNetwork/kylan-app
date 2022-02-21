import { Button, Popover, Space } from 'antd'
import IonIcon from 'components/ionicon'
import { useUI } from 'providers'

const SOCIAL_ICON = ['logo-medium', 'logo-twitter', 'logo-telegram']

const MenuSocial = ({ vertical = false }: { vertical?: boolean }) => {
  const directType = vertical ? 'vertical' : 'horizontal'
  return (
    <Space direction={directType}>
      {SOCIAL_ICON?.map((icon, idx) => (
        <Button
          type="text"
          shape="circle"
          icon={<IonIcon name={icon} key={idx} />}
          key={idx}
        />
      ))}
    </Space>
  )
}

const Social = () => {
  const {
    ui: { infix },
  } = useUI()

  const mobileView = infix === 'xs'

  if (mobileView)
    return (
      <Popover content={<MenuSocial vertical />}>
        <Button
          type="text"
          shape="circle"
          icon={<IonIcon name="share-social-outline" />}
        />
      </Popover>
    )

  return <MenuSocial />
}

export default Social
