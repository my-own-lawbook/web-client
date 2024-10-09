/**
 * Response that contains information about the auth tokens
 */
export default interface TokenResponse {

    /**
     * The access token
     */
    accessToken: string,

    /**
     * The refresh token
     */
    refreshToken: string

}