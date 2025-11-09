import request from '@/utils/request'

const songApi = {
  songs: () => request('/songs', { method: 'GET' }),
  getSongDetail: (songId: string) =>
    request('/songs/detail', { method: 'GET', params: { songId } }),
}

export default songApi
