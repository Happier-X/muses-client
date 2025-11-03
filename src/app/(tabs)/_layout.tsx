import IcoMoonIcon from '@/components/shared/IcoMoonIcon'
import { Tabs } from 'expo-router'

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerTitleAlign: 'center',
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: '首页',
          tabBarIcon: ({ color }) => <IcoMoonIcon name="home_3_line" size={25} color={color} />,
        }}
      />
      <Tabs.Screen
        name="musicLibrary"
        options={{
          title: '音乐库',
          tabBarIcon: ({ color }) => <IcoMoonIcon name="music_line" size={25} color={color} />,
        }}
      />
      <Tabs.Screen
        name="my"
        options={{
          title: '我的',
          tabBarIcon: ({ color }) => <IcoMoonIcon name="user_2_line" size={25} color={color} />,
        }}
      />
    </Tabs>
  )
}
