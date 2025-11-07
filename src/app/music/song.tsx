import { FlatList, StyleSheet, Text, View } from 'react-native'

export default function Song() {
  return (
    <View style={styles.container}>
      <View style={styles.header}></View>
      <FlatList
        data={[]}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text>{item.title}</Text>
          </View>
        )}
      ></FlatList>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    minHeight: 0,
  },
  header: {
    height: 200,
  },
})
