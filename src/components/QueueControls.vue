<template>
    <n-flex align="center" justify="end" class="size-full">
        <n-button
            quaternary
            circle
            :focusable="false"
            @click="
                playerStore.setLoopMode(
                    playerStore.loopMode === 'listLoop'
                        ? 'singleLoop'
                        : 'listLoop'
                )
            ">
            <template #icon>
                <n-icon
                    :class="
                        playerStore.loopMode === 'singleLoop'
                            ? 'i-mingcute-repeat-one-line'
                            : 'i-mingcute-repeat-line'
                    "></n-icon>
            </template>
        </n-button>
        <n-button
            quaternary
            circle
            :focusable="false"
            @click="
                playerStore.setPlayMode(
                    playerStore.playMode === 'orderPlay'
                        ? 'randomPlay'
                        : 'orderPlay'
                )
            ">
            <template #icon>
                <n-icon
                    :class="
                        playerStore.playMode === 'orderPlay'
                            ? 'i-mingcute-list-ordered-line'
                            : 'i-mingcute-shuffle-2-line'
                    "></n-icon>
            </template>
        </n-button>
        <n-badge :value="playerStore.playQueue.length" type="success">
            <n-button
                quaternary
                circle
                :focusable="false"
                @click="handleShowPlayQueue">
                <template #icon>
                    <n-icon class="i-mingcute-playlist-line"></n-icon>
                </template>
            </n-button>
        </n-badge>
    </n-flex>
    <PlayQueue ref="playQueueRef"></PlayQueue>
</template>
<script setup lang="ts">
import { usePlayerStore } from '@/stores/player'
import PlayQueue from './PlayQueue.vue'
import { useTemplateRef } from 'vue'

const playerStore = usePlayerStore()
const playQueueRef = useTemplateRef('playQueueRef')
const handleShowPlayQueue = () => {
    if (playQueueRef.value) {
        playQueueRef.value.showPlayQueue()
    }
}
</script>
