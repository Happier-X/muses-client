import React from 'react'
import { View, Text } from 'react-native'

type MusesCellGroupProps = {
  title: string
  children: React.ReactNode
}

const MusesCellGroup: React.FC<MusesCellGroupProps> = ({ title, children }) => {
  return (
    <View className="p-4 gap-4">
      <Text className="text-xl font-bold text-black">{title}</Text>
      <View>{children}</View>
    </View>
  )
}

export default MusesCellGroup
