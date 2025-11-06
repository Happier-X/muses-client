import { StyleSheet, Text, ScrollView } from 'react-native'
import MusesScrollX from '@/components/shared/MusesScrollX'

export default function Index() {
  return (
    <ScrollView style={styles.container}>
      <MusesScrollX title="推荐" onPress={() => console.log('推荐')}>
        <Text>测试</Text>
      </MusesScrollX>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    minHeight: 0,
  },
})
