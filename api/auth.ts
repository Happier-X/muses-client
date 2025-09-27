// import { request } from "./index";
// import { storage } from "@/cool";

// /**
//  * 登录
//  * @param params { username: string, password: string }
//  * @returns Promise<Response>
//  */
// type loginParams = {
// 	username: string,
// 	password: string
// }
// export function login(params: loginParams){
// 	return request({
// 		url: "/auth/login",
// 		method: "POST",
// 		data: params
// 	});
// }

// /**
//  * 刷新token
//  * @returns Promise<Response>
//  */
// export function refreshToken(){
// 	return request({
// 		url: "/auth/refresh-token",
// 		header: {
// 			"refresh-token": storage.get("refreshToken")
// 		}
// 	});
// }
