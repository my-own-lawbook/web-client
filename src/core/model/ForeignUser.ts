import Profile from "./Profile.ts";

/**
 * Represents a user that is not the user that is currently logged in
 */
type ForeignUser = {

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
    profile: Profile

}

export default ForeignUser