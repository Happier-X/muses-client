import { useBottomSheetBackHandler } from '@/hooks/useBottomSheetBackHandler'
import { BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet'
import React, { forwardRef, useImperativeHandle, useRef } from 'react'
import { Text } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

export type ImmersionType = {
  open: () => void
}

const Immersion = forwardRef<ImmersionType>((props, ref) => {
  const { top } = useSafeAreaInsets()
  const bottomSheetModalRef = useRef<BottomSheetModal>(null)
  useImperativeHandle(ref, () => ({
    open: () => bottomSheetModalRef.current?.present(),
  }))
  const { handleSheetPositionChange } = useBottomSheetBackHandler(bottomSheetModalRef)
  return (
    <BottomSheetModal
      ref={bottomSheetModalRef}
      enableDynamicSizing
      snapPoints={['100%']}
      enablePanDownToClose={true}
      enableHandlePanningGesture={false}
      handleComponent={null}
      topInset={top}
      onChange={handleSheetPositionChange}
    >
      <BottomSheetView style={{ height: '100%' }}>
        <Text>测试</Text>
        <Text>测试</Text>
        <Text>测试</Text>
        <Text>测试</Text>
        <Text>测试</Text>
        <Text>测试</Text>
        <Text>测试</Text>
        <Text>测试</Text>
        <Text>测试</Text>
      </BottomSheetView>
    </BottomSheetModal>
  )
})

export default Immersion
