import { View } from 'react-native'
import MusesCell from '@/components/shared/MusesCell'
import MusesCellGroup from '@/components/shared/MusesCellGroup'

export default function MusicLibrary() {
  const menuList = [
    {
      id: 1,
      title: '歌曲',
    },
    {
      id: 2,
      title: '专辑',
    },
    {
      id: 3,
      title: '艺术家',
    },
  ]
  return (
    <View className="flex-1">
      <MusesCellGroup title="音乐库">
        {menuList.map((item, index) => (
          <MusesCell key={item.id} title={item.title} arrow isFirst={index === 0} isLast={index === menuList.length - 1} />
        ))}
      </MusesCellGroup>
    </View>
  )
}
