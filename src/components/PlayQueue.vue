<template>
    <n-drawer
        v-model:show="show"
        to="#muses-layout-content"
        width="24rem"
        :show-mask="false">
        <n-drawer-content
            closable
            header-class="font-size-4"
            :native-scrollbar="false">
            <template #header>
                <n-badge
                    :value="playerStore.playQueue.length"
                    :offset="[10, 0]"
                    type="success">
                    <n-text>播放队列</n-text>
                </n-badge>
            </template>
            <n-list hoverable :show-divider="false">
                <n-list-item
                    v-for="item in playerStore.playQueue"
                    :key="item.id">
                    <n-flex
                        align="center"
                        class="h-12 w-full"
                        :wrap="false"
                        @dblclick="play(item)">
                        <n-image
                            class="h-full aspect-square rounded-lg"
                            preview-disabled
                            object-fit="cover"
                            :src="
                                item.cover ??
                                'https://app.tngeek.com/api_sso/open/file/b4c64ae_cat-8321993_1280.webp'
                            " />
                        <n-flex vertical align="flex-start" size="small">
                            <n-text strong>
                                {{ item.title ?? '未知标题' }}
                            </n-text>
                            <n-text :depth="3">
                                {{ item.artist ?? '未知艺术家' }}
                            </n-text>
                        </n-flex>
                    </n-flex>
                </n-list-item>
            </n-list>
        </n-drawer-content>
    </n-drawer>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { usePlayerStore } from '@/stores/player'

const playerStore = usePlayerStore()
const show = ref(false)
const showPlayQueue = () => {
    show.value = true
}
defineExpose({
    showPlayQueue
})
const play = async (item) => {
    await playerStore.loadSong(item)
    playerStore.play()
}
</script>
