import MusesCell from '@/components/shared/MusesCell'
import MusesCellGroup from '@/components/shared/MusesCellGroup'
import {
  Disc3 as AlbumIcon,
  MicVocal as ArtistIcon,
  Heart as LikeIcon,
  ListMusic as PlaylistIcon,
  History as RecentPlayIcon,
  Music2 as SongIcon,
} from 'lucide-react-native'
import { View } from 'react-native'

export default function Music() {
  const musicLibraryMenuList = [
    {
      id: 1,
      title: '歌曲',
      leftIcon: <SongIcon size={16} />,
    },
    {
      id: 2,
      title: '专辑',
      leftIcon: <AlbumIcon size={16} />,
    },
    {
      id: 3,
      title: '艺术家',
      leftIcon: <ArtistIcon size={16} />,
    },
  ]
  const myMenuList = [
    {
      id: 1,
      title: '歌单',
      leftIcon: <PlaylistIcon size={16} />,
    },
    {
      id: 2,
      title: '喜欢',
      leftIcon: <LikeIcon size={16} />,
    },
    {
      id: 3,
      title: '最近播放',
      leftIcon: <RecentPlayIcon size={16} />,
    },
  ]
  return (
    <View className="flex-1">
      <MusesCellGroup title="音乐库">
        {musicLibraryMenuList.map((item, index) => (
          <MusesCell
            key={item.id}
            title={item.title}
            leftIcon={item.leftIcon}
            arrow
            isFirst={index === 0}
            isLast={index === musicLibraryMenuList.length - 1}
          />
        ))}
      </MusesCellGroup>
      <MusesCellGroup title="我的">
        {myMenuList.map((item, index) => (
          <MusesCell
            key={item.id}
            title={item.title}
            leftIcon={item.leftIcon}
            arrow
            isFirst={index === 0}
            isLast={index === myMenuList.length - 1}
          />
        ))}
      </MusesCellGroup>
    </View>
  )
}
