// import { request } from "./index";
// import { storage } from "@/cool";

// /**
//  * 获取歌曲
//  * @returns Promise<Response>
//  */
// export function getSongs(page: number = 1, size: number = 10){
// 	return request({
// 		url: "/songs",
// 		data: {
// 			page,
// 			size
// 		}
// 	});
// }

// /**
//  * 获取歌曲流
//  * @param id 歌曲ID
//  * @returns String 歌曲流地址
//  */
// export function getSongStream(id: string): string {
// 	const serviceUrl = storage.get("serviceUrl");
// 	return `${serviceUrl}/songs/stream?id=${id}&accessToken=${storage.get("accessToken")}`;
// }

// /**
//  * 获取歌曲详情
//  * @param songId 歌曲ID
//  * @returns Promise<Response>
//  */
// export function getSongDetail(songId: string){
// 	return request({
// 		url: "/songs/detail",
// 		data: {
// 			songId
// 		}
// 	});
// }
