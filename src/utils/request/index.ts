import { message as Message } from 'antd'
import systemConfig from '@/config'
import { getLocalStorage } from '@/utils/storage'
import axios, { AxiosRequestConfig } from 'axios'
import {
  errorCode,
  errorMsg,
  handleCommonError,
  handleNoCommontError
} from './errorHandle'

type requestOptions = AxiosRequestConfig & {
  method?: string // 请求方法 默认为'get'
  body?: any // 参数
  headers?: any // header参数
  noLoading?: boolean // 是否需要显示loading
}
const { baseUrl, authKey } = systemConfig
axios.interceptors.response.use(
  (response: any) => {
    Message.destroy()
    const { data } = response
    const { code, message } = data
    if (code !== 10000) {
      Message.error(message)
    }
    return data
  },
  error => {
    Message.destroy()
    const { response } = error
    // 请求有响应
    if (response) {
      const { status, data, config } = response
      data.message = data.message || errorMsg
      const { code, message } = data
      if (status >= 400 && status < 500) {
        handleCommonError(data, config)
        // TODO:当状态码为400时
        const errorObj = { code, message }
        if (
          data &&
          data.code >= errorCode.c240015 &&
          data.code <= errorCode.c240021
        ) {
          return Promise.reject(new Error(JSON.stringify(errorObj)))
        }
        return Promise.reject(message)
      }
      // 404 502 ..
      // const msg = errorMsg
      handleNoCommontError(errorMsg)
      return Promise.reject(errorMsg)
      // throw message;
    }
    // 请求超时
    if (error.code === 'ECONNABORTED') {
      // 请求超时
      const timeoutMsg = '请求超时，请稍后再试'
      handleNoCommontError(timeoutMsg)
      return Promise.reject(timeoutMsg)
    }
    const networkErrorMsg = '您的网络出现问题，请检查网络重试'
    handleNoCommontError(networkErrorMsg)
    return Promise.reject(networkErrorMsg)
  }
)
// TODO: 添加options 类型interface
export default async function request(url: string, options?: requestOptions) {
  const hasApi = url.indexOf('http://') === -1 && url.indexOf('https://') === -1
  const uid = getLocalStorage('uid')
  const Authorization = getLocalStorage(authKey)
  let headers = {}
  if (options) {
    headers = options.headers || {}
  }
  const defaultOptions = {
    headers: {
      ...headers,
      [authKey]: `Bearer ${Authorization}`,
      uid
    },
    timeout: 10000,
    // withCredentials: true, // 开启cookie
    validateStatus(status: any) {
      return status >= 200 && status < 300 // default
    }
  }
  if (options) {
    delete options.headers
  }
  const newOptions: requestOptions = { ...defaultOptions, ...options }
  newOptions.data = newOptions.body
  delete newOptions.body
  if (!newOptions.noLoading) {
    // TODO:公共loading处理，根据项目具体修改
    Message.loading({ content: '加载中...', duration: 10 })
  }
  const newUrl = !hasApi ? url : baseUrl + url
  return axios(newUrl, newOptions)
}
