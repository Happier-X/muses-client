import { request } from "./index";

/**
 * 获取下一个队列项
 * @param currentQueueItemId 当前队列项ID
 * @param playMode 当前播放模式
 * @returns Promise<Response>
 */
export function getNextQueueItem(
	currentQueueItemId: string,
	playMode: "orderPlay" | "randomPlay"
): Promise<Response> {
	return request({
		url: "/queue-items/next",
		method: "GET",
		data: {
			currentQueueItemId,
			playMode
		}
	});
}
/**
 * 获取上一个队列项
 * @param currentQueueItemId 当前队列项ID
 * @param playMode 当前播放模式
 * @returns Promise<Response>
 */
export function getPreviousQueueItem(
	currentQueueItemId: string,
	playMode: "orderPlay" | "randomPlay"
): Promise<Response> {
	return request({
		url: "/queue-items/previous",
		method: "GET",
		data: {
			currentQueueItemId,
			playMode
		}
	});
}
