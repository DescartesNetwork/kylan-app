import { Button, Image, Popover, Space } from 'antd'
import IonIcon from 'components/ionicon'
import { useUI } from 'providers'

import Telegram from 'static/images/social/icon-tele.svg'
import Twitter from 'static/images/social/icon-tw.svg'
import Discord from 'static/images/social/icon-discord.svg'
import Docs from 'static/images/social/icon-docs.svg'

const SOCIAL = [
  { icon: Discord, url: 'https://discord.gg/ydR2hWUqWR' },
  { icon: Telegram, url: 'https://t.me/KylanHQ' },
  { icon: Twitter, url: 'https://twitter.com/KylanHQ' },
  { icon: Docs, url: 'https://docs.kylan.so' },
]

const MenuSocial = ({ vertical = false }: { vertical?: boolean }) => {
  const directType = vertical ? 'vertical' : 'horizontal'

  return (
    <Space direction={directType}>
      {SOCIAL.map(({ icon, url }, idx) => (
        <Button
          type="text"
          shape="circle"
          icon={<Image src={icon} preview={false} />}
          onClick={() => window.open(url, '_blank')}
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
      <Popover placement="bottom" content={<MenuSocial vertical />}>
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
