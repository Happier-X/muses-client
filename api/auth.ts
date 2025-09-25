import { request } from "./index";
import { storage } from "@/cool";

/**
 * 登录
 * @param params { username: string, password: string }
 * @returns Promise<Response>
 */
export function login(params: { username: string; password: string }): Promise<Response> {
	return request({
		url: "/auth/login",
		method: "POST",
		data: params
	});
}

/**
 * 刷新token
 * @returns Promise<Response>
 */
export function refreshToken(): Promise<Response> {
	return request({
		url: "/auth/refresh-token",
		header: {
			"refresh-token": storage.get("refreshToken")
		}
	});
}
