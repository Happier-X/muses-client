// import { getNextQueueItem, getPreviousQueueItem } from "@/api/queueItems";
// import { getSongStream, getSongDetail } from "@/api/songs";
import { useUi } from "@/uni_modules/cool-ui";
import { getServiceUrl } from "@/utils";
import { ref } from "vue";
import { storage } from "@/cool";

type SongDetailResponseData = {
	cover?: string;
	title?: string;
};

type SongDetailResponse = {
	code?: number;
	message?: string;
	data?: SongDetailResponseData;
};

const audioContext = uni.createInnerAudioContext();

export const loopMode = ref<"listLoop" | "singleLoop">("listLoop");
export const playMode = ref<"orderPlay" | "randomPlay">("orderPlay");
export const currentSongId = ref("");
export const currentSongDetail = ref<SongDetailResponseData>({});
export const isPlaying = ref(false);

const ui = useUi();
/**
 * 加载歌曲
 */
export const loadSong = async (id: string) => {
	currentSongId.value = id;
	let serviceUrl = getServiceUrl();
	if (serviceUrl == null) {
		return;
	}
	audioContext.src = `${serviceUrl}/songs/stream?id=${id}&accessToken=${storage.get("accessToken")}`;
	// uni.request<SongDetailResponse>({
	// 	url: serviceUrl + "/songs/detail",
	// 	data: {
	// 		songId: id
	// 	},
	// 	success: (res) => {
	// 		currentSongDetail.value = res.data?.data;
	// 	},
	// 	fail: (err) => {
	// 		console.error("获取歌曲详情失败", err);
	// 	},
	// 	complete: () => {}
	// });
};
/**
 * 播放
 */
export const play = () => {
	isPlaying.value = true;
	audioContext.play();
};
/**
 * 暂停
 */
export const pause = () => {
	audioContext.pause();
	isPlaying.value = false;
};
/**
 * 设置循环模式
 * @param mode 'listLoop' 列表循环 | 'singleLoop' 单曲循环
 */
export const setLoopMode = (mode: "listLoop" | "singleLoop") => {
	loopMode.value = mode;
};
/**
 * 设置播放模式
 * @param mode 'orderPlay' 顺序播放 | 'randomPlay' 随机播放
 */
export const setPlayMode = (mode: "orderPlay" | "randomPlay") => {
	playMode.value = mode;
};
/**
 * 播放下一首
 */
export const playNext = () => {
	let serviceUrl = getServiceUrl();
	if (serviceUrl == null) {
		return;
	}
	// uni.request({
	// 	url: serviceUrl + "/queue-items/next",
	// 	data: {
	// 		currentQueueItemId: currentSongId.value,
	// 		playMode: playMode.value
	// 	},
	// 	success: (res) => {
			
	// 	},
	// 	fail: (err) => {
			
	// 	},
	// 	complete: () => {}
	// });
	// try {
	// 	const res = await getNextQueueItem(currentSongId.value, playMode.value);
	// 	if (res) {
	// 		await loadSong(res.data.id);
	// 		play();
	// 	}
	// } catch (err) {
	// 	console.error("播放下一首失败", err);
	// } finally {
	// }
};
/**
 * 播放上一首
 */
export const playPrevious = async () => {
	// try {
	// 	const res = await getPreviousQueueItem(currentSongId.value, playMode.value);
	// 	if (res) {
	// 		await loadSong(res.data.id);
	// 		play();
	// 	}
	// } catch (err) {
	// 	console.error("播放上一首失败", err);
	// } finally {
	// }
};

audioContext.onPlay(() => {
	isPlaying.value = true;
});
audioContext.onEnded(() => {
	isPlaying.value = false;
	if (loopMode.value === "listLoop") {
		playNext();
	} else if (loopMode.value === "singleLoop") {
		play();
	}
});
audioContext.onError(() => {
	isPlaying.value = false;
});
