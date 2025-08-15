<template>
    <n-flex align="center" justify="center" class="size-full">
        <n-button quaternary circle :focusable="false">
            <template #icon>
                <n-icon class="i-mingcute-skip-previous-line"></n-icon>
            </template>
        </n-button>
        <n-button
            quaternary
            circle
            :focusable="false"
            size="large"
            @click="
                playerStore.isPlaying
                    ? playerStore.pause()
                    : playerStore.resume()
            ">
            <template #icon>
                <n-icon
                    :class="
                        playerStore.isPlaying
                            ? 'i-mingcute-pause-line'
                            : 'i-mingcute-play-line'
                    "></n-icon>
            </template>
        </n-button>
        <n-button quaternary circle :focusable="false">
            <template #icon>
                <n-icon class="i-mingcute-skip-forward-line"></n-icon>
            </template>
        </n-button>
    </n-flex>
</template>
<script setup lang="ts">
import { usePlayerStore } from '@/stores/player'
const playerStore = usePlayerStore()
</script>
