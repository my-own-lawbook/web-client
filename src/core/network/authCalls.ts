import apiCall, {ApiResult, authenticatedApiCall} from "./base/apiCall.ts";
import ProfileResponse from "./responses/ProfileResponse.ts";
import AuthUserWithoutProfileResponse from "./responses/AuthUserWithoutProfileResponse.ts";
import TokenResponse from "./responses/TokenResponse.ts";

/**
 * Fetches information about the authenticated user
 */
export async function fetchUserInfo(): Promise<ApiResult<AuthUserWithoutProfileResponse>> {
    return authenticatedApiCall(
        "/user/",
        undefined,
        "get"
    )
}


/**
 * Fetches the currently authenticated users profile
 */
export async function fetchUserProfile(): Promise<ApiResult<ProfileResponse>> {
    return authenticatedApiCall(
        "/user/profile/",
        undefined,
        "get"
    )
}

/**
 * Refreshes the locally stores access token
 *
 * @return The promise for the request
 */
export async function refreshApiCall(refreshToken: string): Promise<ApiResult<TokenResponse>> {
    return apiCall<TokenResponse>(
        "/auth/login/refresh/",
        {token: refreshToken},
        "post"
    )
}

/**
 * Will request an email verify token for the authenticated user
 */
export async function requestEmailVerifyTokenApiCall(): Promise<ApiResult<void>> {
    return authenticatedApiCall(
        "/auth/signup/email-verify/",
        undefined,
        "post"
    )
}

/**
 * Submits an email token to the server
 * @param token The token
 */
export async function submitEmailVerifyTokenApiCall(token: string): Promise<ApiResult<void>> {
    return apiCall(
        "/auth/signup/email-verify/",
        {token: token},
        "patch"
    )
}

/**
 * Request to log in with credentials
 * @param email The email
 * @param password The password
 */
export async function loginApiCall(email: string, password: string): Promise<ApiResult<TokenResponse>> {
    return apiCall(
        "/auth/login/",
        {email: email, password: password},
        "post"
    )
}

/**
 * Signs the user up
 * @param email The email
 * @param username The username
 * @param password The password
 */
export async function signupApiCall(email: string, username: string, password: string): Promise<ApiResult<AuthUserWithoutProfileResponse>> {
    return apiCall(
        "/auth/signup/",
        {email: email, username: username, password: password},
        "post"
    )
}

/**
 * Invalidates a specific refresh token
 * @param refreshToken The refresh token
 */
export async function logoutApiCall(refreshToken: string): Promise<ApiResult<void>> {
    return authenticatedApiCall(
        `/auth/logout/?token=${refreshToken}`,
        undefined,
        "post"
    )
}

/**
 * Invalidates all refresh token
 */
export async function logoutAllApiCall(): Promise<ApiResult<void>> {
    return authenticatedApiCall(
        `/auth/logout/all/`,
        undefined,
        "post"
    )
}