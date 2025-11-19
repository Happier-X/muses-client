import PlayBar from '@/components/feature/PlayBar'
import { ScrollView, Text, View } from 'react-native'

export default function Index() {
  return (
    <View className="flex-1">
      <ScrollView className="flex-1 bg-background">
        <Text>开发中</Text>
      </ScrollView>
      <PlayBar></PlayBar>
    </View>
  )
}
