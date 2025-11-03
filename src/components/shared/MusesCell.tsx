import { View, Text } from 'react-native'
import MusesIcon from '@/components/shared/MusesIcon'

type MusesCellProps = {
  icon?: string
  title: string
  value?: string
}

const MusesCell: React.FC<MusesCellProps> = ({ icon, title, value }) => {
  return (
    <View className="flex-row bg-white p-4">
      {icon && <MusesIcon name={icon} />}
      <Text>{title}</Text>
      {value && <Text className="ml-auto text-right text-gray-500">{value}</Text>}
    </View>
  )
}

export default MusesCell
