import songApi from '@/api/song'
import MusesIconButton from '@/components/ui/MusesIconButton'
import { useQuery } from '@tanstack/react-query'
import { Image } from 'expo-image'
import { useLocalSearchParams } from 'expo-router'
import { EllipsisVertical as MoreIcon } from 'lucide-react-native'
import { FlatList, StyleSheet, Text, View, Pressable, GestureResponderEvent } from 'react-native'
import { usePlayerStore } from '@/stores/playerStore'

type SongListItemProps = {
  cover: string
  title: string
  album: string
  artist: string
  onPress?: (event: GestureResponderEvent) => void
}

const SongListItem: React.FC<SongListItemProps> = ({ cover, title, album, artist, onPress }) => {
  const serverAddress = globalThis.localStorage.getItem('serverAddress') ?? ''
  return (
    <Pressable onPress={onPress} style={styles.songListItem}>
      <Image source={{ uri: `${serverAddress}${cover}` }} style={styles.songListItemCover} />
      <View style={styles.songListItemInfo}>
        <Text style={styles.songListItemTitle}>{title}</Text>
        <Text style={styles.songListItemArtistAlbum}>
          {artist}-{album}
        </Text>
      </View>
      <MusesIconButton icon={<MoreIcon />} onPress={() => console.log('more')}></MusesIconButton>
    </Pressable>
  )
}

export default function SongList() {
  const loadSong = usePlayerStore((state) => state.loadSong)
  const play = usePlayerStore((state) => state.play)
  const setPlayQueue = usePlayerStore((state) => state.setPlayQueue)
  const params = useLocalSearchParams()
  const {
    data: songsData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['songs'],
    queryFn: () => songApi.songs({ page: 1, size: 100 }),
  })
  if (isLoading) return <Text>Loading...</Text>
  if (error) return <Text>Error: {error.message}</Text>
  return (
    <FlatList
      style={{ flex: 1 }}
      data={songsData?.data?.items ?? []}
      renderItem={({ item }) => (
        <SongListItem
          cover={item.cover}
          title={item.title}
          artist={item.artist}
          album={item.album}
          onPress={() => {
            loadSong(item.id)
            play()
            setPlayQueue([...(songsData?.data?.items.map((item) => item.id) ?? [])])
          }}
        />
      )}
      keyExtractor={(item) => item.id.toString()}
      showsVerticalScrollIndicator={false}
    />
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    minHeight: 0,
  },
  songListItem: {
    flexDirection: 'row',
    padding: 12,
    alignItems: 'center',
    gap: 12,
    backgroundColor: 'white',
  },
  songListItemCover: {
    width: 48,
    height: 48,
    borderRadius: 8,
  },
  songListItemInfo: {
    flex: 1,
    minWidth: 0,
    minHeight: 0,
  },
  songListItemTitle: {
    fontWeight: 'bold',
  },
  songListItemArtistAlbum: {
    color: 'gray',
  },
})
