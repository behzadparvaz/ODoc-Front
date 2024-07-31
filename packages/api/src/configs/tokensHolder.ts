import { storage } from '@repo/utils'

const LocalStorageKeys = {
  accessToken: 'access_token',
  refreshToken: 'refresh_token',
}

let accessToken: string | null = storage.getItem(LocalStorageKeys.accessToken)
let refreshToken: string | null = storage.getItem(LocalStorageKeys.refreshToken)

// Access token
export function getAccessToken() {
  if (!accessToken) {
    accessToken = storage.getItem(LocalStorageKeys.accessToken)
  }
  return accessToken
}

export const setAccessToken = (value: string) => {
  accessToken = value
  if (typeof window !== 'undefined') {
    // setToken(value)
    storage.setItem(LocalStorageKeys.accessToken, value)
  }
}

// Refresh token
export function getRefreshToken() {
  return refreshToken
}

export const setRefreshToken = (value: string) => {
  refreshToken = value
  storage.setItem(LocalStorageKeys.refreshToken, value)
}

export function removeAllTokens() {
  refreshToken = null
  accessToken = null
  storage.clearStorage()
}
