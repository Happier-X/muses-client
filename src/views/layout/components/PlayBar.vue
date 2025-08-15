<template>
    <n-flex align="center" :wrap="false" class="size-full p-3 relative">
        <div class="absolute w-full left-0 top-[-0.5rem] z-1">
            <ProgressBar />
        </div>
        <n-flex align="center" class="size-full">
            <n-image
                class="h-full aspect-square rounded-lg"
                preview-disabled
                object-fit="cover"
                :src="
                    playerStore.currentSongInfo?.cover ??
                    'https://app.tngeek.com/api_sso/open/file/b4c64ae_cat-8321993_1280.webp'
                " />
            <n-flex vertical align="flex-start" size="small">
                <n-text strong>
                    {{ playerStore.currentSongInfo?.title ?? '未知标题' }}
                </n-text>
                <n-text :depth="3">
                    {{ playerStore.currentSongInfo?.artist ?? '未知艺术家' }}
                </n-text>
            </n-flex>
        </n-flex>
        <div class="size-full">
            <PlayControls />
        </div>
        <div class="size-full">
            <QueueControls />
        </div>
    </n-flex>
</template>
<script setup lang="ts">
import ProgressBar from '@/components/common/ProgressBar.vue'
import PlayControls from '@/components/common/PlayControls.vue'
import QueueControls from '@/components/common/QueueControls.vue'
import { usePlayerStore } from '@/stores/player'
const playerStore = usePlayerStore()
</script>
