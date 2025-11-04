import { ChevronRight as ArrowRightIcon } from 'lucide-react-native'
import { Text, View } from 'react-native'

type MusesCellProps = {
  leftIcon?: React.ReactNode
  title: string
  value?: string
  arrow?: boolean
  isFirst?: boolean
  isLast?: boolean
}

const MusesCell: React.FC<MusesCellProps> = ({
  leftIcon,
  title,
  value,
  arrow,
  isFirst,
  isLast,
}) => {
  return (
    <View
      className={`flex-row items-center justify-between bg-white p-4 ${isFirst ? 'rounded-t-lg' : ''} ${isLast ? 'rounded-b-lg' : ''}`}
    >
      <View className="flex-row items-center justify-center gap-4">
        {leftIcon && leftIcon}
        <Text>{title}</Text>
      </View>
      <View className="flex-row items-center justify-center gap-4">
        {value && <Text className="ml-auto text-right text-gray-500">{value}</Text>}
        {arrow && <ArrowRightIcon color="gray" size={16} />}
      </View>
    </View>
  )
}

export default MusesCell
