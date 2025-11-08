import MusesIconButton from '@/components/ui/MusesIconButton'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Stack, usePathname, useRouter } from 'expo-router'
import { ChevronLeft as ArrowLeftIcon } from 'lucide-react-native'
import { View } from 'react-native'
import PlayBar from '@/components/feature/PlayBar'

type SongListRouteParams = {
  from: string
  title?: string
}

const queryClient = new QueryClient()

export default function Layout() {
  const router = useRouter()
  const pathname = usePathname()
  return (
    <QueryClientProvider client={queryClient}>
      <View style={{ flex: 1 }}>
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
          <Stack.Screen name="auth" options={{ headerShown: false }} />
          <Stack.Screen
            name="songList"
            options={({ route }) => ({ title: (route.params as SongListRouteParams).title })}
          />
        </Stack>
        {!pathname.startsWith('/auth') && <PlayBar />}
      </View>
    </QueryClientProvider>
  )
}
