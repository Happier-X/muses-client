import React from 'react'
import { View, Text } from 'react-native'

type MusesCellGroupProps = {
  title: string
  children: React.ReactNode
}

const MusesCellGroup: React.FC<MusesCellGroupProps> = ({ title, children }) => {
  return (
    <View className="p-4">
      <Text>{title}</Text>
      {children}
    </View>
  )
}

export default MusesCellGroup
