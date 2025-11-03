// import { Stack } from "expo-router";
import { Tabs, Stack, Link } from 'expo-router'
import "@/assets/global.css"

export default function Layout() {
  return (
    <Stack
      screenOptions={{
        headerTitleAlign: 'center',
        animation: 'slide_from_right',
      }}
    >
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="details" options={{ title: '详情页' }} />
    </Stack>
  )
}
