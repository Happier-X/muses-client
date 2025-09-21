import { request } from "./index";

/**
 * 获取歌曲
 * @param params { username: string, password: string }
 * @returns Promise<Response>
 */
export function getSongs(): Promise<Response> {
    return request({
        url: "/songs",
        method: "GET",
    });
}