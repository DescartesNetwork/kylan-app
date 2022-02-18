import { Button, Space } from 'antd'
import IonIcon from 'components/ionicon'

const SOCIAL_ICON = ['logo-medium', 'logo-twitter', 'logo-telegram']

const Social = () => {
  return (
    <Space size={24}>
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

export default Social
