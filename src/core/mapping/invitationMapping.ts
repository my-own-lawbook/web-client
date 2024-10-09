import InvitationResponse from "../network/responses/InvitationResponse.ts";
import ForeignUser from "../model/ForeignUser.ts";
import Book from "../model/Book.ts";
import Invitation from "../model/Invitation.ts";
import {memberRoleFromNumber} from "../model/MemberRole.ts";
import dayjs from "dayjs";
import {invitationStatusFromString} from "../model/InvitationStatus.ts";

/**
 * Maps an invitation response to an invitation
 * @param invitationResponse The invitation response
 * @param author The author
 * @param targetBook The target book
 * @param recipient The recipient
 */
export function mapInvitation(
    invitationResponse: InvitationResponse,
    author: ForeignUser,
    targetBook: Book,
    recipient: ForeignUser
): Invitation {
    return {
        id: invitationResponse.id,
        author: author,
        targetBook: targetBook,
        recipient: recipient,
        role: memberRoleFromNumber(invitationResponse.role),
        sentAt: dayjs(invitationResponse.sentAt),
        usedAt: invitationResponse.usedAt ? dayjs(invitationResponse.usedAt) : null,
        status: invitationStatusFromString(invitationResponse.status),
        expiredAt: invitationResponse.expiredAt ? dayjs(invitationResponse.expiredAt) : null,
        message: invitationResponse.message
    }
}