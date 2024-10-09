/**
 * Response body that contains info about a user
 */
export default interface AuthUserWithoutProfileResponse {

    /**
     * The id
     */
    id: number,

    /**
     * The email
     */
    email: string,

    /**
     * The username
     */
    username: string,

    /**
     * Whether the email is verified
     */
    isEmailVerified: boolean

}