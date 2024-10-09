import {MemberRole} from "./MemberRole.ts";
import ForeignUser from "./ForeignUser.ts";

/**
 * Represents a user in the context of a book
 */
type BookMember = {

    /**
     * The users member role
     */
    memberRole: MemberRole

} & ForeignUser

export default BookMember