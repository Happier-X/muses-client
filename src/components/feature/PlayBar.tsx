import { ChevronRight as ArrowRightIcon } from 'lucide-react-native'
import { GestureResponderEvent, Text, View, Pressable, StyleSheet } from 'react-native'
import { Image } from 'react-native'
import MusesIconButton from '@/components/ui/MusesIconButton'

const PlayBar = () => {
  const serverAddress = globalThis.localStorage.getItem('serverAddress') ?? ''
  return (
    <Pressable style={styles.container}>
      {/* <Image source={`${serverAddress}${cover}`} style={styles.songListItemCover} /> */}
      <View style={styles.songListItemInfo}>
        <Text style={styles.songListItemTitle}>标题</Text>
        <Text style={styles.songListItemArtistAlbum}>
          艺术家-专辑
        </Text>
      </View>
      {/* <MusesIconButton icon={<MoreIcon />} onPress={() => console.log('more')}></MusesIconButton> */}
    </Pressable>
  )
}

export default PlayBar

const styles = StyleSheet.create({
  container: {
    height: 72,
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
