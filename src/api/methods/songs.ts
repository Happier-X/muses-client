import { alova, fileAlova } from '..'

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
    return fileAlova.Get(`/songs/stream/${id}`)
}
