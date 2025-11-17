import MusesIconButton from '@/components/ui/MusesIconButton'
import { LegendList } from '@legendapp/list'
import { ChevronRight as ArrowRightIcon } from 'lucide-react-native'
import React from 'react'
import {
  GestureResponderEvent,
  ListRenderItem,
  StyleSheet,
  Text,
  View
} from 'react-native'

type MusesScrollXProps = {
  title: string
  data: ArrayLike<any>
  keyExtractor: (item: any, index: number) => string
  renderItem: ListRenderItem<any>
  onPressMore?: (event: GestureResponderEvent) => void
}

const MusesScrollX: React.FC<MusesScrollXProps> = ({
  title,
  data,
  keyExtractor,
  renderItem,
  onPressMore,
}) => {
  return (
    <>
      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>
        <MusesIconButton
          icon={<ArrowRightIcon />}
          onPress={onPressMore && onPressMore}
        ></MusesIconButton>
      </View>
      <LegendList
        horizontal
        data={data}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        showsHorizontalScrollIndicator={false}
      />
    </>
  )
}

export default MusesScrollX

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
})
