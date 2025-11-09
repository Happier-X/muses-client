import { BottomSheetModal, BottomSheetModalProvider, BottomSheetView } from '@gorhom/bottom-sheet'
import React, { useRef, useCallback, useImperativeHandle, forwardRef } from 'react'
import { Button, StyleSheet, Text, View } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'

export const Immersion = forwardRef((props, ref) => {
  // ref
  const bottomSheetModalRef = useRef<BottomSheetModal>(null)

  // callbacks
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present()
  }, [])
  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index)
  }, [])
  useImperativeHandle(ref, () => ({
    open: () => bottomSheetModalRef.current?.present(),
  }))
  return (
    <GestureHandlerRootView style={styles.container}>
      <BottomSheetModalProvider>
        {/* <Button onPress={handlePresentModalPress} title="Present Modal" color="black" /> */}
        <BottomSheetModal
          ref={bottomSheetModalRef}
          onChange={handleSheetChanges}
          snapPoints={['100%']}
        >
          <BottomSheetView style={styles.contentContainer}>
            <View style={{ flex: 1 }}>
              <Text>Awesome 🎉</Text>
            </View>
          </BottomSheetView>
        </BottomSheetModal>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  )
})

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    backgroundColor: 'grey',
  },
  contentContainer: {
    height: '100%',
    alignItems: 'center',
  },
})
