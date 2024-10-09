import ProfileResponse from "./ProfileResponse.ts";

/**
 * Response for a user with profile
 */
export default interface AuthUserWithProfileResponse {

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
    isEmailVerified: boolean,

    /**
     * The profile
     */
    profile: ProfileResponse

}