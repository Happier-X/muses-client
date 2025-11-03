import createIconSetFromIcoMoon from '@expo/vector-icons/createIconSetFromIcoMoon'
import { useFonts } from 'expo-font'
import React from 'react'

const Icon = createIconSetFromIcoMoon(
  require('@/assets/icomoon/selection.json'),
  'IcoMoon',
  'icomoon.ttf',
)

interface IcoMoonIconProps {
  name: string
  size?: number
  color?: string
}

export default function IcoMoonIcon({ name, size = 30, color = '#000' }: IcoMoonIconProps) {
  const [fontsLoaded] = useFonts({
    IcoMoon: require('@/assets/icomoon/icomoon.ttf'),
  })

  if (!fontsLoaded) return null

  return <Icon name={name} size={size} color={color} />
}
