import { request } from "./index";

/**
 * 获取下一个队列项
 * @param currentQueueItemId 当前队列项ID
 * @param playMode 当前播放模式
 * @returns String 下一首歌曲ID
 */
export function getNextQueueItem(
	currentQueueItemId: string,
	playMode: "orderPlay" | "randomPlay"
): Promise<Response> {
	return request({
		url: "/queue-items/next",
		method: "GET",
		params: {
			currentQueueItemId,
			playMode
		}
	});
}
/**
 * 获取上一个队列项
 * @param currentQueueItemId 当前队列项ID
 * @param playMode 当前播放模式
 * @returns String 上一首歌曲ID
 */
export function getPreviousQueueItem(
	currentQueueItemId: string,
	playMode: "orderPlay" | "randomPlay"
): Promise<Response> {
	return request({
		url: "/queue-items/previous",
		method: "GET",
		params: {
			currentQueueItemId,
			playMode
		}
	});
}
