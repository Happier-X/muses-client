import { alova } from '..'

export const scanSongs = (scanAll?: boolean) => {
    return alova.Get('/songs/scan', {
        params: {
            scanAll
        }
    })
}

export const getAllSongsList = () => {
    return alova.Get('/songs/list')
}

export const getSongStream = (id: string) => {
    return alova.Get('/songs/stream', {
        params: {
            id
        }
    })
}
