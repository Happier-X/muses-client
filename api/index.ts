import { storage, isNull, router, isObject, parse } from "@/cool";
import { locale, t } from "@/locale";
import { refreshToken } from "./auth";

// 请求参数类型定义
export type RequestOptions = {
	url: string; // 请求地址
	method?: RequestMethod; // 请求方法
	data?: any; // 请求体数据
	params?: any; // URL参数
	header?: any; // 请求头
	timeout?: number; // 超时时间
	withCredentials?: boolean; // 是否携带凭证
	firstIpv4?: boolean; // 是否优先使用IPv4
	enableChunked?: boolean; // 是否启用分块传输
};

// 响应数据类型定义
export type Response = {
	code?: number;
	message?: string;
	data?: any;
};

/**
 * 通用请求方法
 * @param options 请求参数
 * @returns Promise<T>
 */
export function request(options: RequestOptions): Promise<any | null> {
	let { url, method = "GET", data = {}, header = {}, timeout = 60000 } = options;

	const serviceUrl = storage.get("serviceUrl");

	if (isNull(serviceUrl)) {
		return Promise.reject({ message: t("服务地址未配置") } as Response);
	}

	// 拼接基础url
	if (!url.startsWith("http")) {
		url = serviceUrl + url;
	}

	// 获取token
	let Authorization: string | null = `Bear ${storage.get("token")}`;

	return new Promise((resolve, reject) => {
		uni.request({
			url,
			method,
			data,
			header: {
				Authorization,
				language: locale.value,
				...(header as UTSJSONObject)
			},
			timeout,

			async success(res) {
				// 401 无权限
				if (res.statusCode == 401 && !url.includes("/auth/refresh-token")) {
					const res = await refreshToken();
					if (res.code == 401) {
						storage.remove("token");
						storage.remove("userInfo");
						router.login();
						reject({ message: t("无权限") } as Response);
					} else {
						options.header.Authorization = `Bearer ${storage.get("token")}`;
						const res = await request(options);
						return resolve(res);
					}
				}
				// 502 服务异常
				else if (res.statusCode == 502) {
					reject({
						message: t("服务异常")
					} as Response);
				}
				// 404 未找到
				else if (res.statusCode == 404) {
					return reject({
						message: `[404] ${url}`
					} as Response);
				}
				// 200 正常响应
				else if (res.statusCode == 200) {
					if (res.header.authorization) {
						storage.set("token", res.header.authorization, 0);
					}
					if (res.header.refreshToken) {
						storage.set("refreshToken", res.header.refreshToken, 0);
					}
					if (res.data == null) {
						resolve(null);
					} else if (!isObject(res.data as any)) {
						resolve(res.data);
					} else {
						// 解析响应数据
						const { code, message, data } = parse<Response>(res.data ?? { code: 0 })!;

						switch (code) {
							case 1000:
								resolve(data);
								break;
							default:
								reject({ message, code } as Response);
								break;
						}
					}
				} else {
					reject({ message: t("服务异常") } as Response);
				}
			},

			// 网络请求失败
			fail(err) {
				reject({ message: err.errMsg } as Response);
			}
		});
	});
}
