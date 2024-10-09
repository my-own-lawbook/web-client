/**
 * Status that an invitation may be in
 */
enum InvitationStatus {

    /**
     * Open
     */
    Open = "Open",

    /**
     * Accepted
     */
    Accepted = "Accepted",

    /**
     * Revoked
     */
    Revoked = "Revoked",

    /**
     * Denied
     */
    Denied = "Declined"

}

export default InvitationStatus

/**
 * Maps a string to the corresponding invitation status
 * @param string The string
 */
export function invitationStatusFromString(string: string): InvitationStatus {
    if (string == "accepted") return InvitationStatus.Accepted
    else if (string == "revoked") return InvitationStatus.Revoked
    else if (string == "declined") return InvitationStatus.Denied
    else return InvitationStatus.Open
}