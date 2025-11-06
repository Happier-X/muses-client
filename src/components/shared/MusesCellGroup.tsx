import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

type MusesCellGroupProps = {
  title: string
  children: React.ReactNode
}

const MusesCellGroup: React.FC<MusesCellGroupProps> = ({ title, children }) => {
  return (
    <View style={styles.cellGroup}>
      <Text style={styles.title}>{title}</Text>
      <View>{children}</View>
    </View>
  )
}

export default MusesCellGroup

const styles = StyleSheet.create({
  cellGroup: {
    padding: 12,
    gap: 4,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
})
