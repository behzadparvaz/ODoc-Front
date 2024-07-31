import axios, { AxiosRequestConfig } from 'axios'
import AxiosAbortController from './configs/AxiosAbortController'
import errorHandler from './configs/errorHandler'
import { getAccessToken } from "./configs"
import apiUrls from './configs/apiUrls'
import { apiConfig } from './constants'

declare module 'axios' {
  export interface AxiosRequestConfig {
    withoutCancellation?: boolean
  }
}

const AbortController = new AxiosAbortController()

const axiosInstance = axios.create({
  baseURL: apiConfig.BASE_URL,
})

export type AxiosRequestConfigCustom = AxiosRequestConfig & {
  withoutCancellation?: boolean,
  signal?: any
}

axiosInstance.interceptors.request.use((config: AxiosRequestConfigCustom) => {
  const { headers, url, withoutCancellation } = config
  const token = getAccessToken()

  if (token && headers) {
    headers.authorization = `Bearer ${token}`
  }
  if (!withoutCancellation) {
    AbortController.setSignal(url)

    config.signal = AbortController.getSignal(url)
  }

  return config
})

axiosInstance.interceptors.response.use(
  response => response,
  error => (error.config?.url === apiUrls.user.refresh ? Promise.reject(error) : errorHandler(error))
)

export default axiosInstance
