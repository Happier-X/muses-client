import { Tabs, Link } from 'expo-router'
import { StyleSheet, TouchableOpacity } from 'react-native'

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerTitleAlign: 'center',
      }}
    >
      <Tabs.Screen name="index" options={{ title: '首页' }} />
      <Tabs.Screen name="musicLibrary" options={{ title: '音乐库' }} />
      <Tabs.Screen name="my" options={{ title: '我的' }} />
    </Tabs>
  )
}
