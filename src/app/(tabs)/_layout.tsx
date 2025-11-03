import MusesIcon from '@/components/shared/MusesIcon'
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
          tabBarIcon: ({ color }) => <MusesIcon name="home_3_line" color={color} />,
        }}
      />
      <Tabs.Screen
        name="musicLibrary"
        options={{
          title: '音乐库',
          tabBarIcon: ({ color }) => <MusesIcon name="music_line" color={color} />,
        }}
      />
      <Tabs.Screen
        name="my"
        options={{
          title: '我的',
          tabBarIcon: ({ color }) => <MusesIcon name="user_2_line" color={color} />,
        }}
      />
    </Tabs>
  )
}
