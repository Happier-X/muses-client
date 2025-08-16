import { alova, fileAlova } from '..'

export const scanSongs = (scanAll?: boolean) => {
    return alova.Post('/songs/scan', {
        scanAll
    })
}

export const getAllSongsList = () => {
    return alova.Get('/songs/list')
}

export const getSongStream = (id: string) => {
    return fileAlova.Get('/songs/stream', {
        params: {
            id
        }
    })
}

export const addPlayCount = (id: string) => {
    return alova.Post('/songs/addPlayCount', {
        id
    })
}

export const getMinPlayCountSong = (ids: string) => {
    return alova
        .Get('/songs/minPlayCountSong', {
            params: {
                ids
            }
        })
        .send(true)
}
