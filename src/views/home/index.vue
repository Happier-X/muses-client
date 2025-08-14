<template>
    <n-flex vertical>
        <n-flex vertical>
            <n-flex justify="space-between" align="center">
                <n-h3 prefix="bar" class="mb-0!">推荐歌曲</n-h3>
                <n-button
                    quaternary
                    type="primary"
                    :focusable="false"
                    icon-placement="right">
                    更多
                    <template #icon>
                        <n-icon class="i-mingcute-right-line"></n-icon>
                    </template>
                </n-button>
            </n-flex>
            <RecommendSongsList :list="songsList" />
        </n-flex>
    </n-flex>
</template>

<script setup lang="ts">
import { useRequest } from 'alova/client'
import RecommendSongsList from './components/RecommendSongsList.vue'
import { getAllSongsList } from '@/api/methods/songs'

const { data: songsList } = useRequest(getAllSongsList, {
    initialData: []
})
</script>
