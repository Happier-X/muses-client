import { Pressable, PressableProps } from 'react-native'

type MusesIconButtonProps = {
  icon?: React.ReactNode
  onPress?: PressableProps['onPress']
}

const MusesIconButton: React.FC<MusesIconButtonProps> = ({ icon, onPress }) => {
  return <Pressable onPress={onPress}>{icon && icon}</Pressable>
}

export default MusesIconButton
