import IcoMoonIcon from '@/components/shared/IcoMoonIcon'
import { Text, View } from 'react-native'

export default function Index() {
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <IcoMoonIcon name="ad_circle_fill" />
      <Text className="text-xl font-bold text-blue-500">首页</Text>
    </View>
  )
}
