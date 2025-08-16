<template>
    <n-grid x-gap="20" y-gap="20" :cols="5" collapsed :collapsed-rows="2">
        <n-gi v-for="item in list" :key="item.id">
            <n-flex vertical>
                <n-image
                    class="aspect-square rounded-xl shadow-md"
                    object-fit="cover"
                    preview-disabled
                    :src="item.cover"
                    :alt="item.title"
                    @click="handlePlay(item)" />
                <n-flex vertical :size="0">
                    <n-text strong class="font-size-4 line-clamp-1">
                        {{ item?.title ?? '未知歌曲' }}
                    </n-text>
                    <n-text :depth="3" class="line-clamp-1">
                        {{ item?.artist ?? '未知艺术家' }}
                    </n-text>
                </n-flex>
            </n-flex>
        </n-gi>
    </n-grid>
</template>
<script setup lang="ts">
import { NGrid, NGi, NFlex, NText } from 'naive-ui'
import { usePlayerStore } from '@/stores/player'

const props = defineProps({
    list: {
        type: Array as () => any[],
        required: true
    }
})
const playerStore = usePlayerStore()
const handlePlay = async (item) => {
    playerStore.setPlayQueue(props.list)
    await playerStore.loadSong(item)
    playerStore.play()
}
</script>
