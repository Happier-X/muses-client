import {
    addPlayCount,
    getSongStream,
    getMinPlayCountSong
} from '@/api/methods/songs'
import { Howl } from 'howler'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const usePlayerStore = defineStore('player', () => {
    // 音频播放器实例
    const sound = ref<Howl | null>(null)
    // 当前播放歌曲的信息
    const currentSongInfo = ref<any>(null)
    // 播放队列
    const playQueue = ref<any[]>([])
    // 当前播放索引
    const currentPlayIndex = ref(0)
    // 是否正在播放
    const isPlaying = ref(false)
    // 循环模式，listLoop：列表循环，singleLoop：单曲循环
    const loopMode = ref('listLoop')
    // 播放模式，orderPlay：顺序播放，randomPlay：随机播放
    const playMode = ref('orderPlay')
    // 音频总时长
    const duration = ref(0)
    // 当前播放时间
    const currentTime = ref(0)
    // 歌词当前播放行数
    const currentLyricLine = ref(0)
    // 歌词数组
    const lyricLines: any = ref([])
    // BlogUrl
    const activeBlobUrl = ref<string | null>(null)
    // 歌词解析器
    // let lrc = new Lyric({
    //     onPlay: (line) => {
    //         // line: 当前播放行数
    //         currentLyricLine.value = line
    //     },
    //     onSetLyric: (lines) => {
    //         // lines: 歌词数组
    //         lyricLines.value = lines
    //     },
    //     // 偏移时间，默认为150ms,单位为毫秒
    //     offset: 0,
    //     // 播放速度，默认为1
    //     playbackRate: 1,
    //     // 是否去除空行，默认为true
    //     isRemoveBlankLine: true
    // })
    /**
     * 设置播放队列
     */
    function setPlayQueue(list: any[]) {
        playQueue.value = list
    }
    /**
     * 更新播放进度的步进函数
     */
    function step() {
        if (sound.value && sound.value.playing()) {
            // 获取当前播放位置
            const seek = sound.value.seek() || 0
            currentTime.value = seek
            // lrc.play(seek * 1000)
            requestAnimationFrame(step)
        }
    }
    /**
     * 加载歌曲
     */
    async function loadSong(song: any) {
        currentTime.value = 0
        currentSongInfo.value = song
        sound.value?.unload()
        updateCurrentPlayIndex()
        try {
            if (activeBlobUrl.value) {
                URL.revokeObjectURL(activeBlobUrl.value)
                activeBlobUrl.value = null
            }
            const blob = await getSongStream(song.id)
            activeBlobUrl.value = URL.createObjectURL(blob as Blob)
            sound.value = new Howl({
                src: [activeBlobUrl.value],
                format: ['mp3', 'flac'],
                html5: true,
                onload: async () => {
                    duration.value = sound.value?.duration() || 0
                    await addPlayCount(song.id)
                },
                onplay: async () => {
                    isPlaying.value = true
                    // 开始更新进度
                    requestAnimationFrame(step)
                },
                onpause: () => {
                    isPlaying.value = false
                },
                onseek: () => {
                    // 手动调整进度后继续更新
                    requestAnimationFrame(step)
                },
                onend: async () => {
                    isPlaying.value = false
                    if (loopMode.value === 'listLoop') {
                        playNext()
                    } else if (loopMode.value === 'singleLoop') {
                        await loadSong(playQueue.value[currentPlayIndex.value])
                        play()
                    }
                }
            })
        } catch (error) {
            console.log(error)
        }
    }

    /**
     * 播放歌曲
     */
    async function play() {
        sound.value?.play()
        // await getLyric(currentSongInfo.value.url)
    }

    /**
     * 播放下一首
     */
    async function playNext() {
        isPlaying.value = false
        if (playMode.value === 'orderPlay') {
            if (currentPlayIndex.value < playQueue.value.length - 1) {
                currentPlayIndex.value++
            } else {
                currentPlayIndex.value = 0
            }
            await loadSong(playQueue.value[currentPlayIndex.value])
        } else {
            const res = await getMinPlayCountSong(
                playQueue.value.map((item) => item.id).join(',')
            )
            if (res) {
                await loadSong(res)
            }
        }
        play()
    }

    /**
     * 播放上一首
     */
    async function playPrevious() {
        isPlaying.value = false
        if (playMode.value === 'orderPlay') {
            if (currentPlayIndex.value > 0) {
                currentPlayIndex.value--
            } else {
                currentPlayIndex.value = playQueue.value.length - 1
            }
            await loadSong(playQueue.value[currentPlayIndex.value])
        } else {
            const res = await getMinPlayCountSong(
                playQueue.value.map((item) => item.id).join(',')
            )
            if (res) {
                await loadSong(res)
            }
        }
        play()
    }

    /**
     * 暂停播放
     */
    function pause() {
        sound.value?.pause()
        // lrc.pause()
    }

    /**
     * 继续播放
     */
    function resume() {
        sound.value?.play()
    }

    /**
     * 设置循环模式，listLoop：列表循环，singleLoop：单曲循环
     */
    function setLoopMode(mode: any) {
        loopMode.value = mode
    }

    /**
     * 设置播放模式，orderPlay：顺序播放，randomPlay：随机播放
     */
    function setPlayMode(mode: 'orderPlay' | 'randomPlay') {
        playMode.value = mode
    }

    /**
     * 设置播放进度
     */
    function seek(time: number) {
        if (sound.value) {
            sound.value.seek(time)
            if (sound.value.playing()) {
                requestAnimationFrame(step)
            }
        }
    }

    /**
     * 获取当前歌曲的歌词
     */
    // async function getLyric(url: string) {
    //     const response = await fetch(url)
    //     const webStream = response.body
    //     const res = await parseWebStream(webStream as any)
    //     if (
    //         res &&
    //         res.common &&
    //         res.common.lyrics &&
    //         res.common.lyrics.length > 0
    //     ) {
    //         lrc.setLyric(res.common.lyrics[0].text as string)
    //     }
    // }

    // let playerStore = null as Store | null
    // /**
    //  * 保存当前播放信息
    //  */
    // const saveCurrentPlayInfo = async () => {
    //     playerStore = await Store.load('store.player')
    //     await playerStore?.set('currentPlayInfo', {
    //         currentSongInfo: currentSongInfo.value,
    //         currentPlayQueue: playQueue.value
    //     })
    // }
    const updateCurrentPlayIndex = () => {
        const index = playQueue.value.findIndex(
            (item) => item.id === currentSongInfo.value?.id
        )
        currentPlayIndex.value = index !== -1 ? index : 0
    }
    return {
        setPlayQueue,
        loadSong,
        play,
        playNext,
        playPrevious,
        currentSongInfo,
        isPlaying,
        playQueue,
        pause,
        resume,
        loopMode,
        playMode,
        setLoopMode,
        setPlayMode,
        duration,
        currentTime,
        seek,
        currentLyricLine,
        lyricLines
        // saveCurrentPlayInfo
    }
})
