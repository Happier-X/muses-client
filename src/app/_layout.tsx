import MusesIconButton from '@/components/shared/MusesIconButton'
import { Stack, useRouter } from 'expo-router'
import { ChevronLeft as ArrowLeftIcon } from 'lucide-react-native'

export default function Layout() {
  const router = useRouter()
  return (
    <Stack
      screenOptions={{
        headerTitleAlign: 'center',
        animation: 'slide_from_right',
        headerLeft: () => (
          <MusesIconButton icon={<ArrowLeftIcon />} onPress={() => router.back()} />
        ),
        headerBackVisible: false,
      }}
    >
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="music/song" options={{ title: '歌曲' }} />
      <Stack.Screen name="auth" options={{ headerShown: false }} />
    </Stack>
  )
}
