import songApi from '@/api/song'
import { AudioPlayer, createAudioPlayer } from 'expo-audio'
import { create } from 'zustand'

export const usePlayerStore = create((set) => {
  let player: AudioPlayer | null = null

  return {
    isPlaying: false,
    currentSongDetail: null,
    loadSong: async (songId: string) => {
      const serverAddress = globalThis.localStorage.getItem('serverAddress') ?? ''
      const accessToken = globalThis.localStorage.getItem('accessToken') ?? ''
      const streamUrl = `${serverAddress}/songs/stream/?songId=${songId}&accessToken=${accessToken}`
      if (player) {
        player.replace(streamUrl)
      } else {
        player = createAudioPlayer(streamUrl)
      }
      try {
        const res = await songApi.getSongDetail(songId)
        set({ currentSongDetail: res.data })
      } catch (error) {
        console.error('加载歌曲详情失败', error)
      }
      player.addListener('playbackStatusUpdate', (status) => {
        if (status.playbackState === 'ended' && status.didJustFinish === true) {
          set({ isPlaying: false })
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
  }
})
