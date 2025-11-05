import { Text, View } from 'react-native'
import { Link } from 'expo-router'

export default function My() {
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text className="text-xl font-bold text-blue-500">我的页面开发中</Text>
      <Link href="../auth">登录</Link>
    </View>
  )
}
