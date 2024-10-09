import ForeignUser from "../model/ForeignUser.ts";

/**
 * Formats the name of a user
 * @param user The user
 */
export function formatName(user: ForeignUser): string {
    return `${user.profile.firstName} ${user.profile.lastName} `
}