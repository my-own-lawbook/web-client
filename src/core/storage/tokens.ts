const KEY_ACCESS = "access_token"
const KEY_REFRESH = "refresh_token"

/**
 * Sets the access token to the local storage
 * @param token The access token
 */
export function setAccessToken(token: string | null) {
    if (token) {
        localStorage.setItem(KEY_ACCESS, token)
    } else {
        localStorage.removeItem(KEY_ACCESS)
    }
}

/**
 * Sets the refresh token to the local storage
 * @param refresh The refresh token
 */
export function setRefreshToken(refresh: string | null) {
    if (refresh) {
        localStorage.setItem(KEY_REFRESH, refresh)
    } else {
        localStorage.removeItem(KEY_REFRESH)
    }
}

/**
 * Gets the access token
 */
export function getAccessToken() {
    return localStorage.getItem(KEY_ACCESS)
}

/**
 * Gets the refresh token
 */
export function getRefreshToken() {
    return localStorage.getItem(KEY_REFRESH)
}