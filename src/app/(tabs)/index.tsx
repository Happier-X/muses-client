import { StyleSheet, Text, ScrollView, View } from 'react-native'
import MusesScrollX from '@/components/ui/MusesScrollX'
import PlayBar from '@/components/feature/PlayBar'

export default function Index() {
  return (
    <View style={styles.container}>
      <ScrollView style={styles.container}>
        <MusesScrollX title="推荐" onPress={() => console.log('推荐')}>
          <Text>测试</Text>
        </MusesScrollX>
      </ScrollView>
      <PlayBar></PlayBar>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    minHeight: 0,
  },
})
