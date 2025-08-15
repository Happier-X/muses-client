<template>
    <n-slider
        :value="sliderValue"
        :step="0.01"
        :max="playerStore.duration"
        :format-tooltip="formatTooltip"
        :on-update:value="handleValueUpdate"
        :on-dragstart="handleDragStart"
        :on-dragend="handleDragEnd"
        :disabled="playerStore.duration <= 0" />
</template>
<script setup lang="ts">
import { usePlayerStore } from '@/stores/player'
import { formatTime } from '@/utils/formatTime'
import { ref, watch } from 'vue'

const playerStore = usePlayerStore()
const formatTooltip = (value: number) => {
    return formatTime(value)
}
const sliderValue = ref(0)
const isDragging = ref(false)
watch(
    () => playerStore.currentTime,
    (newVal) => {
        if (!isDragging.value) {
            sliderValue.value = newVal
        }
    },
    { immediate: true }
)
const handleValueUpdate = (val: number) => {
    if (val !== undefined && val !== null) {
        sliderValue.value = val
        if (!isDragging.value) {
            playerStore.seek(val)
        }
    }
}
const handleDragStart = () => {
    isDragging.value = true
}
const handleDragEnd = () => {
    if (sliderValue.value !== playerStore.currentTime) {
        playerStore.seek(sliderValue.value)
    }
    isDragging.value = false
}
</script>
