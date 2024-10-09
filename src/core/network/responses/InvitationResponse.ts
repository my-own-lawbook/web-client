/**
 * Type for a response body for an invitation
 */
type InvitationResponse = {

    /**
     * The id
     */
    id: number,

    /**
     * The author id
     */
    authorId: number,

    /**
     * The id of the book
     */
    targetBookId: number,

    /**
     * The id of the recipient
     */
    recipientId: number,

    /**
     * The role
     */
    role: number,

    /**
     * When the invitation was sent at
     */
    sentAt: string,

    /**
     * When the invitation was used
     */
    usedAt: string | null,

    /**
     * The status
     */
    status: string,

    /**
     * When the invitation expired
     */
    expiredAt: string | null,

    /**
     * The optional message of the invitation
     */
    message: string | null

}

export default InvitationResponse