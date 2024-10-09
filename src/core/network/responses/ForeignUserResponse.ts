import ProfileResponse from "./ProfileResponse.ts";

/**
 * Response body for a foreign user
 */
type ForeignUserResponse = {

    /**
     * The id
     */
    id: number,

    /**
     * The username
     */
    username: string,

    /**
     * The profile
     */
    profile: ProfileResponse

}

export default ForeignUserResponse