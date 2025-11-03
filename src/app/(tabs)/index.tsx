import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { Link, Stack } from 'expo-router'

export default function Index() {
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text className="text-xl font-bold text-blue-500">Welcome to Nativewind!</Text>
    </View>
  )
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   title: {
//     fontSize: 40,
//     fontWeight: 'bold',
//     color: '#e29447',
//   },
//   link: {
//     marginTop: 20,
//     fontSize: 20,
//     color: '#1f99b0',
//   },
//   buttonText: {
//     marginTop: 20,
//     fontSize: 20,
//     color: '#ff7f6f',
//   },
// })
