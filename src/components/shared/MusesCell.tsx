import { ChevronRight as ArrowRightIcon } from 'lucide-react-native'
import { PressableProps, Text, View, Pressable } from 'react-native'

type MusesCellProps = {
  leftIcon?: React.ReactNode
  title: string
  value?: string
  arrow?: boolean
  isFirst?: boolean
  isLast?: boolean
  onPress?: PressableProps['onPress']
}

const MusesCell: React.FC<MusesCellProps> = ({
  leftIcon,
  title,
  value,
  arrow,
  isFirst,
  isLast,
  onPress,
}) => {
  return (
    <Pressable
      onPress={onPress}
      className={`flex-row items-center bg-white active:bg-gray-200 justify-between p-4 ${isFirst ? 'rounded-t-lg' : ''} ${isLast ? 'rounded-b-lg' : ''} will-change-pressable`}
    >
      <View className="flex-row items-center justify-center gap-4">
        {leftIcon && leftIcon}
        <Text>{title}</Text>
      </View>
      <View className="flex-row items-center justify-center gap-4">
        {value && <Text className="ml-auto text-right text-gray-500">{value}</Text>}
        {arrow && <ArrowRightIcon color="gray" size={16} />}
      </View>
    </Pressable>
  )
}

export default MusesCell
