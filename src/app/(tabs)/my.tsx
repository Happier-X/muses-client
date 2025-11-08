import { Text, View, StyleSheet } from 'react-native'
import { Link } from 'expo-router'
import PlayBar from '@/components/feature/PlayBar'

export default function My() {
  return (
    <View style={{ flex: 1 }}>
      <View style={styles.container}>
        <Text>我的页面开发中</Text>
        <Link href="../auth">登录</Link>
      </View>
      <PlayBar></PlayBar>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    minHeight: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
})
