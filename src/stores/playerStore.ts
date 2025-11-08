import { create } from 'zustand'
import { AudioPlayer, createAudioPlayer } from 'expo-audio'

export const usePlayerStore = create((set) => {
  let player: AudioPlayer | null = null

  return {
    isPlaying: false,
    loadSong: (songId: string) => {
      const serverAddress = globalThis.localStorage.getItem('serverAddress') ?? ''
      const accessToken = globalThis.localStorage.getItem('accessToken') ?? ''
      const streamUrl = `${serverAddress}/songs/stream/?songId=${songId}&accessToken=${accessToken}`
      if (player) {
        player.replace(streamUrl)
      } else {
        player = createAudioPlayer(streamUrl)
      }
    },
    play: () => {
      if (player) {
        set({ isPlaying: true })
        player.play()
      }
    },
  }
})
