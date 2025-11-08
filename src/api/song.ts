import request from '@/utils/request'

const songApi = {
  songs: () => request('/songs', { method: 'GET' }),
}

export default songApi
