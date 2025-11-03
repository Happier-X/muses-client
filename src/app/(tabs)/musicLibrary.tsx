import { View } from 'react-native'
import MusesCell from '@/components/shared/MusesCell'
import MusesCellGroup from '@/components/shared/MusesCellGroup'

export default function MusicLibrary() {
  const menuList = [
    {
      id: 1,
      title: '歌曲',
      value: '123',
    },
    {
      id: 2,
      title: '专辑',
      value: '456',
    },
    {
      id: 3,
      title: '艺术家',
      value: '789',
    },
  ]
  return (
    <View className="flex-1">
      <MusesCellGroup title="音乐库">
        {menuList.map((item) => (
          <MusesCell key={item.id} title={item.title} value={item.value} />
        ))}
      </MusesCellGroup>
    </View>
  )
}
