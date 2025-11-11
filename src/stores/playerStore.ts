import queueApi from '@/api/queue'
import songApi from '@/api/song'
import { AudioPlayer, createAudioPlayer, setAudioModeAsync } from 'expo-audio'
import { create } from 'zustand'

export const usePlayerStore = create((set, get) => {
  let player: AudioPlayer | null = null

  return {
    isPlaying: false,
    currentSongDetail: null,
    loopMode: 'listLoop',
    playMode: 'orderPlay',
    currentTime: 0,
    duration: 0,
    seekTo: (time: number) => {
      if (player) {
        player.seekTo(time)
      }
    },
    loadSong: async (songId: string) => {
      const serverAddress = globalThis.localStorage.getItem('serverAddress') ?? ''
      const accessToken = globalThis.localStorage.getItem('accessToken') ?? ''
      const streamUrl = `${serverAddress}/songs/stream/?songId=${songId}&accessToken=${accessToken}`
      if (player) {
        player.replace(streamUrl)
      } else {
        player = createAudioPlayer(streamUrl)
      }
      set({ currentTime: 0 })
      await setAudioModeAsync({
        playsInSilentMode: true,
        shouldPlayInBackground: true,
        interruptionModeAndroid: 'duckOthers',
        interruptionMode: 'mixWithOthers',
      })
      try {
        const res = await songApi.getSongDetail(songId)
        set({ currentSongDetail: res.data })
        // player.setActiveForLockScreen(true)
      } catch (error) {
        console.error('加载歌曲详情失败', error)
      }
      player.addListener('playbackStatusUpdate', (status) => {
        if (status.isLoaded) {
          set({ currentTime: status.currentTime, duration: status.duration })
        }
        if (status.playbackState === 'ended' && status.didJustFinish === true) {
          set({ isPlaying: false })
          if (get().loopMode === 'listLoop') {
            get().playNext()
          } else if (get().loopMode === 'singleLoop') {
            get().seekTo(0)
            get().play()
          }
        }
      })
    },
    play: () => {
      if (player) {
        set({ isPlaying: true })
        player.play()
      }
    },
    pause: () => {
      if (player) {
        set({ isPlaying: false })
        player.pause()
      }
    },
    playNext: async () => {
      if (player) {
        set({ isPlaying: false })
        try {
          const res = await queueApi.getNextQueueItem(
            get().currentSongDetail?.id ?? '',
            get().playMode,
          )
          get().loadSong(res.data.songId)
          get().play()
        } catch (error) {
          console.error('加载歌曲详情失败', error)
        }
      }
    },
    playPrevious: async () => {
      if (player) {
        set({ isPlaying: false })
        try {
          const res = await queueApi.getPreviousQueueItem(
            get().currentSongDetail?.id ?? '',
            get().playMode,
          )
          get().loadSong(res.data.songId)
          get().play()
        } catch (error) {
          console.error('加载歌曲详情失败', error)
        }
      }
    },
    changeLoopMode: () => {
      set((state) => ({
        loopMode: state.loopMode === 'listLoop' ? 'singleLoop' : 'listLoop',
      }))
    },
    changePlayMode: () => {
      set((state) => ({
        playMode: state.playMode === 'orderPlay' ? 'randomPlay' : 'orderPlay',
      }))
    },
  }
})
