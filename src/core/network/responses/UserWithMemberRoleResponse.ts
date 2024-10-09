import ForeignUserResponse from "./ForeignUserResponse.ts";

/**
 * Response body for a user with a member role
 */
type UserWithMemberRoleResponse = {

    /**
     * The member role of a book
     */
    role: number,

    /**
     * The user
     */
    user: ForeignUserResponse

}

export default UserWithMemberRoleResponse