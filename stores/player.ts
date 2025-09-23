import { getNextQueueItem, getPreviousQueueItem } from "@/api/queueItems";
import { getSongStream } from "@/api/songs";
import { useUi } from "@/uni_modules/cool-ui";
import { ref } from "vue";

export type PlayerState = {
	loopMode: "listLoop" | "singleLoop";
	playMode: "orderPlay" | "randomPlay";
	currentSongId: string;
};

const audioContext = uni.createInnerAudioContext();

export const playerState = ref<PlayerState>({
	loopMode: "listLoop",
	playMode: "orderPlay",
	currentSongId: ""
});

const ui = useUi();
/**
 * 加载歌曲
 */
export const loadSong = (id: string) => {
	playerState.value.currentSongId = id;
	audioContext.src = getSongStream(id);
};
/**
 * 播放
 */
export const play = () => {
	audioContext.play();
};
/**
 * 暂停
 */
export const pause = () => {
	audioContext.pause();
};
/**
 * 设置循环模式
 * @param mode 'listLoop' 列表循环 | 'singleLoop' 单曲循环
 */
export const setLoopMode = (mode: "listLoop" | "singleLoop") => {
	playerState.value.loopMode = mode;
};
/**
 * 设置播放模式
 * @param mode 'orderPlay' 顺序播放 | 'randomPlay' 随机播放
 */
export const setPlayMode = (mode: "orderPlay" | "randomPlay") => {
	playerState.value.playMode = mode;
};
/**
 * 播放下一首
 */
export const playNext = async () => {
	try {
		const res = await getNextQueueItem(
			playerState.value.currentSongId,
			playerState.value.playMode
		);
		if (res) {
			await loadSong(res.formData.id);
			play();
		}
	} catch (err) {
		console.error("播放下一首失败", err);
	} finally {
	}
};
/**
 * 播放上一首
 */
export const playPrevious = async () => {
	try {
		const res = await getPreviousQueueItem(
			playerState.value.currentSongId,
			playerState.value.playMode
		);
		if (res) {
			await loadSong(res.formData.id);
			play();
		}
	} catch (err) {
		console.error("播放上一首失败", err);
	} finally {
	}
};
