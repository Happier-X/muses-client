import MusesIconButton from '@/components/ui/MusesIconButton'
import { usePlayerStore } from '@/stores/playerStore'
import {
  Play as PlayIcon,
  Pause as PauseIcon,
  ListVideo as PlayQueueIcon,
} from 'lucide-react-native'
import { Image, Pressable, StyleSheet, Text, View } from 'react-native'

const PlayBar = () => {
  const serverAddress = globalThis.localStorage.getItem('serverAddress') ?? ''
  const currentSongDetail = usePlayerStore((state) => state.currentSongDetail)
  const play = usePlayerStore((state) => state.play)
  const pause = usePlayerStore((state) => state.pause)
  const isPlaying = usePlayerStore((state) => state.isPlaying)

  return (
    <Pressable style={styles.container}>
      <Image
        source={{ uri: `${serverAddress}${currentSongDetail?.cover}` }}
        style={styles.songListItemCover}
      />
      <View style={styles.songListItemInfo}>
        <Text style={styles.songListItemTitle}>{currentSongDetail?.title}</Text>
        <Text style={styles.songListItemArtistAlbum}>
          {currentSongDetail?.artist}-{currentSongDetail?.album}
        </Text>
      </View>
      <MusesIconButton
        icon={
          isPlaying ? <PauseIcon fill="black" size={20} /> : <PlayIcon fill="black" size={20} />
        }
        onPress={() => (isPlaying ? pause() : play())}
      ></MusesIconButton>
      <MusesIconButton
        icon={<PlayQueueIcon fill="black" size={20} />}
        onPress={() => console.log('play queue')}
      ></MusesIconButton>
    </Pressable>
  )
}

export default PlayBar

const styles = StyleSheet.create({
  container: {
    height: 72,
    flexDirection: 'row',
    padding: 12,
    alignItems: 'center',
    gap: 12,
    backgroundColor: 'white',
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
