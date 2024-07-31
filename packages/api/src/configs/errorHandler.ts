import { AxiosRequestConfig, AxiosResponse } from 'axios'

import { removeAllTokens } from './tokensHolder'

interface ExpectedErrorResponse {
  config: AxiosRequestConfig & { _retry: boolean; };
  response: AxiosResponse;
}

export const logoutAction = () => {
  removeAllTokens()
  window.location.href = '/logout'
}

export default (error: ExpectedErrorResponse) => {
  if (error.response?.status) {
    const { status } = error.response

    switch (status) {
      case 401:
        logoutAction()

        break
      default:
        break
    }
  }
  return Promise.reject(error)
}
