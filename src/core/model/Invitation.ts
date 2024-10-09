import {MemberRole} from "./MemberRole.ts";
import {Dayjs} from "dayjs";
import InvitationStatus from "./InvitationStatus.ts";
import ForeignUser from "./ForeignUser.ts";
import Book from "./Book.ts";

/**
 * Represents an invitation
 */
type Invitation = {

    /**
     * The id
     */
    id: number,

    /**
     * The id of the author
     */
    author: ForeignUser,

    /**
     * The id of the target book
     */
    targetBook: Book,

    /**
     * The id of the recipient
     */
    recipient: ForeignUser,

    /**
     * The role
     */
    role: MemberRole,

    /**
     * When the invitation was created
     */
    sentAt: Dayjs,

    /**
     * When the invitation was used
     */
    usedAt: Dayjs | null,

    /**
     * The current status
     */
    status: InvitationStatus,

    /**
     * When the invitation expires
     */
    expiredAt: Dayjs | null,

    /**
     * The optional message
     */
    message: string | null

}

export default Invitation