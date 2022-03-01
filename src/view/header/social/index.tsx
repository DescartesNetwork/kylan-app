import { Button, Image, Popover, Space } from 'antd'
import IonIcon from 'components/ionicon'
import { useUI } from 'providers'

import Telegram from 'static/images/social/icon-tele.svg'
import Twitter from 'static/images/social/icon-tw.svg'
import Medium from 'static/images/social/icon-medium.svg'

const SOCIAL = [
  { icon: Medium, url: 'https://sentre.medium.com' },
  { icon: Telegram, url: 'https://t.me/Sentre' },
  { icon: Twitter, url: 'https://twitter.com/SentreProtocol' },
]

const MenuSocial = ({ vertical = false }: { vertical?: boolean }) => {
  const directType = vertical ? 'vertical' : 'horizontal'
  return (
    <Space direction={directType}>
      {SOCIAL.map((item, idx) => (
        <Button
          type="text"
          shape="circle"
          icon={<Image src={item.icon} preview={false} />}
          onClick={() => window.open(item.url, '_blank')}
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
