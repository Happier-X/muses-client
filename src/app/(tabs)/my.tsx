import { Text, View, StyleSheet } from 'react-native'
import { Link } from 'expo-router'
import PlayBar from '@/components/feature/PlayBar'
import { Image } from 'expo-image'
import MusesCell from '@/components/ui/MusesCell'
import {
  FolderSearch as ScanSongIcon,
  UserCog as UserManageIcon,
  Settings as SettingsIcon,
} from 'lucide-react-native'

export default function My() {
  const menuList = [
    {
      id: 1,
      title: '扫描歌曲',
      leftIcon: <ScanSongIcon size={16} />,
    },
    {
      id: 2,
      title: '用户管理',
      leftIcon: <UserManageIcon size={16} />,
    },
    {
      id: 3,
      title: '设置',
      leftIcon: <SettingsIcon size={16} />,
    },
  ]
  return (
    <View style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.userInfo}>
          <Image
            style={styles.userAvatar}
            source={`https://ui-avatars.com/api/?name=admin&length=1&bold=true&background=random`}
          ></Image>
          <View style={styles.userInfoText}>
            <Text>admin</Text>
            <Text>管理员</Text>
          </View>
        </View>
        {menuList.map((item, index) => (
          <MusesCell
            key={item.id}
            title={item.title}
            leftIcon={item.leftIcon}
            arrow
            isFirst={index === 0}
            isLast={index === menuList.length - 1}
            // onPress={item.onPress}
          />
        ))}
        <Link href="../auth">登录</Link>
      </View>
      <PlayBar></PlayBar>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    minHeight: 0,
  },
  userInfo: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  userAvatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  userInfoText: {},
})
