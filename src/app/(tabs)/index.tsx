import { StyleSheet, Text, View } from 'react-native'

export default function Index() {
  return (
    <View style={styles.container}>
      <Text>首页开发中</Text>
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
