import { ChevronRight as ArrowRightIcon } from 'lucide-react-native'
import { GestureResponderEvent, Text, View, Pressable, StyleSheet } from 'react-native'

type MusesCellProps = {
  leftIcon?: React.ReactNode
  title: string
  value?: string
  arrow?: boolean
  isFirst?: boolean
  isLast?: boolean
  onPress?: (event: GestureResponderEvent) => void
}

const MusesCell: React.FC<MusesCellProps> = ({
  leftIcon,
  title,
  value,
  arrow,
  isFirst,
  isLast,
  onPress,
}) => {
  return (
    <Pressable
      onPress={onPress}
      style={[styles.cell, isFirst && styles.firstCell, isLast && styles.lastCell]}
    >
      <View style={styles.content}>
        {leftIcon && leftIcon}
        <Text>{title}</Text>
      </View>
      <View style={styles.content}>
        {value && <Text style={styles.value}>{value}</Text>}
        {arrow && <ArrowRightIcon color="gray" size={16} />}
      </View>
    </Pressable>
  )
}

export default MusesCell

const styles = StyleSheet.create({
  cell: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 12,
    backgroundColor: 'white',
  },
  firstCell: {
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  lastCell: {
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
  },
  value: {
    color: 'gray',
    textAlign: 'right',
  },
})
