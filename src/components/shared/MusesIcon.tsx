import createIconSetFromIcoMoon from '@expo/vector-icons/createIconSetFromIcoMoon'
import { useFonts } from 'expo-font'
import React from 'react'

type MusesIconProps = {
  name: string
  size?: number
  color?: string
}

const Icon = createIconSetFromIcoMoon(
  require('@/assets/icomoon/selection.json'),
  'IcoMoon',
  'icomoon.ttf',
)

const MusesIcon: React.FC<MusesIconProps> = ({ name, size = 24, color = '#000' }) => {
  const [fontsLoaded] = useFonts({
    IcoMoon: require('@/assets/icomoon/icomoon.ttf'),
  })

  if (!fontsLoaded) return null

  return <Icon name={name} size={size} color={color} />
}

export default MusesIcon
