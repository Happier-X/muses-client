import { createAlova } from 'alova'
import VueHook from 'alova/vue'
import adapterFetch from 'alova/fetch'
import { createServerTokenAuthentication } from 'alova/client'
import { refreshToken } from './methods/auth'

const { onResponseRefreshToken } = createServerTokenAuthentication({
    refreshTokenOnSuccess: {
        isExpired: (response) => {
            return response.status === 401
        },
        handler: async () => {
            try {
                const res = await refreshToken()
                if (res.statusCode === 201) {
                    localStorage.setItem('access_token', res.access_token)
                    localStorage.setItem('refresh_token', res.refresh_token)
                } else {
                    location.href = '/auth'
                }
            } catch (error) {
                location.href = '/auth'
                throw error
            }
        }
    },
    async login(response: any) {
        const res = await response.clone().json()
        if (res.statusCode === 201) {
            localStorage.setItem('access_token', res.access_token)
            localStorage.setItem('refresh_token', res.refresh_token)
            location.href = '/app'
        } else {
            window.$message.error(res.message)
        }
    }
})

export const alova = createAlova({
    baseURL: `${import.meta.env.VITE_API_BASE_URL}`,
    statesHook: VueHook,
    requestAdapter: adapterFetch(),
    responded: onResponseRefreshToken((response) => {
        return response.json()
    }),
    beforeRequest: (method) => {
        method.config.headers.Authorization = `Bearer ${localStorage.getItem('access_token')}`
    }
})

export const fileAlova = createAlova({
    baseURL: `${import.meta.env.VITE_API_BASE_URL}`,
    statesHook: VueHook,
    requestAdapter: adapterFetch(),
    responded: onResponseRefreshToken((response) => {
        return response.blob()
    }),
    beforeRequest: (method) => {
        method.config.headers.Authorization = `Bearer ${localStorage.getItem('access_token')}`
    }
})

export const delayLoadingMiddleware =
    (delayTimer = 1000) =>
    async (ctx, next) => {
        const { loading } = ctx.proxyStates
        ctx.controlLoading()
        const timer = setTimeout(() => {
            loading.v = true
        }, delayTimer)
        await next()
        loading.v = false
        clearTimeout(timer)
    }
