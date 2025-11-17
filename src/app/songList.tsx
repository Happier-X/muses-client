import songApi from '@/api/song'
import MusesIconButton from '@/components/ui/MusesIconButton'
import { usePlayerStore } from '@/stores/playerStore'
import { LegendList } from '@legendapp/list'
import { useInfiniteQuery } from '@tanstack/react-query'
import { Image } from 'expo-image'
import { useLocalSearchParams } from 'expo-router'
import { EllipsisVertical as MoreIcon } from 'lucide-react-native'
import { GestureResponderEvent, Pressable, StyleSheet, Text, View } from 'react-native'

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

const LoadingIndicator = () => (
  <View style={styles.loadingIndicator}>
    <Text style={styles.loadingText}>加载中...</Text>
  </View>
)

const NoMoreData = () => (
  <View style={styles.noMoreData}>
    <Text style={styles.noMoreText}>没有更多数据了</Text>
  </View>
)

export default function SongList() {
  const loadSong = usePlayerStore((state) => state.loadSong)
  const play = usePlayerStore((state) => state.play)
  const setPlayQueue = usePlayerStore((state) => state.setPlayQueue)
  const params = useLocalSearchParams()
  const {
    data: songsData,
    isLoading,
    error,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: ['songs'],
    queryFn: ({ pageParam = 1 }) => songApi.songs({ page: pageParam, size: 30 }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      // 从正确的路径获取分页信息
      const currentPage = lastPage.data.pagination.page
      const totalItems = lastPage.data.pagination.total
      const pageSize = lastPage.data.pagination.size

      // 计算已加载的项目数量
      const loadedItems = allPages.flatMap((p) => p.data.items).length

      // 如果已加载数量少于总数，返回下一页页码
      return loadedItems < totalItems ? currentPage + 1 : undefined
    },
    staleTime: 1000 * 60 * 5,
  })

  // 合并所有页面的数据
  const allSongs = songsData?.pages.flatMap((page) => page.data.items) ?? []
  const allSongIds = allSongs.map((item) => item.id)

  const onEndReached = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage()
    }
  }

  if (isLoading) return <Text>Loading...</Text>
  if (error) return <Text>Error: {error.message}</Text>

  return (
    <LegendList
      style={{ flex: 1 }}
      data={allSongs}
      renderItem={({ item }) => (
        <SongListItem
          cover={item.cover}
          title={item.title}
          artist={item.artist}
          album={item.album}
          onPress={() => {
            loadSong(item.id)
            play()
            setPlayQueue(allSongIds)
          }}
        />
      )}
      keyExtractor={(item) => item.id.toString()}
      showsVerticalScrollIndicator={false}
      recycleItems
      onEndReached={onEndReached}
      onEndReachedThreshold={0.1}
      ListFooterComponent={() => {
        if (isFetchingNextPage) {
          return <LoadingIndicator />
        }
        if (!hasNextPage && allSongs.length > 0) {
          return <NoMoreData />
        }
        return null
      }}
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
  loadingIndicator: {
    padding: 20,
    alignItems: 'center',
  },
  loadingText: {
    color: 'gray',
    fontSize: 14,
  },
  noMoreData: {
    padding: 20,
    alignItems: 'center',
  },
  noMoreText: {
    color: 'gray',
    fontSize: 14,
  },
})
