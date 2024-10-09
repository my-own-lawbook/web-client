/**
 * Roles a user may have as a member of a lawbook
 */
export enum MemberRole {

    /**
     * Admin
     */
    Admin = 3,

    /**
     * Moderator
     */
    Moderator = 2,

    /**
     * Member
     */
    Member = 1

}

/**
 * Maps a number to the corresponding member role
 * @param number The number
 */
export function memberRoleFromNumber(number: number): MemberRole {
    if (number == 3) return MemberRole.Admin
    else if (number == 2) return MemberRole.Moderator
    else return MemberRole.Member
}

/**
 * Gets the serialized name of a member role
 * @param role The role
 */
export function localizedRoleName(role: MemberRole): string {
    if (role == MemberRole.Admin) return "roles.admin"
    else if (role == MemberRole.Moderator) return "roles.moderator"
    else return "roles.member"
}