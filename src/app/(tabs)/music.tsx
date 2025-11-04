import { View } from 'react-native'
import MusesCell from '@/components/shared/MusesCell'
import MusesCellGroup from '@/components/shared/MusesCellGroup'

export default function Music() {
  const musicLibraryMenuList = [
    {
      id: 1,
      title: '歌曲',
      icon: 'music_2_line',
    },
    {
      id: 2,
      title: '专辑',
      icon: 'album_line',
    },
    {
      id: 3,
      title: '艺术家',
      icon: 'microphone_line',
    },
  ]
  const myMenuList = [
    {
      id: 1,
      title: '歌单',
      icon: 'playlist_line',
    },
    {
      id: 2,
      title: '喜欢',
      icon: 'heart_line',
    },
    {
      id: 3,
      title: '最近播放',
      icon: 'history_line',
    },
  ]
  return (
    <View className="flex-1">
      <MusesCellGroup title="音乐库">
        {musicLibraryMenuList.map((item, index) => (
          <MusesCell
            key={item.id}
            title={item.title}
            icon={item.icon}
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
            icon={item.icon}
            arrow
            isFirst={index === 0}
            isLast={index === myMenuList.length - 1}
          />
        ))}
      </MusesCellGroup>
    </View>
  )
}
