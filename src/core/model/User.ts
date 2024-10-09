import Profile from "./Profile.ts";

/**
 * Model for the user that is logged in
 */
export default interface User {

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
     * The profile, or null if it has not yet been set
     */
    profile: Profile | null

}