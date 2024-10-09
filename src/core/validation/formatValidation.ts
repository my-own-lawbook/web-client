import dayjs, {Dayjs} from "dayjs";

/**
 * Validates an email address
 * @param email The user entered email address
 */
export function validateEmail(email: string): string | null {
    const regex = /^[^\W_]+\w*(?:[.-]\w*)*[^\W_]+@[^\W_]+(?:[.-]?\w*[^\W_]+)*\.[^\W_]{2,}$/

    if (regex.test(email)) return null
    else return "validation.format.email"
}

/**
 * Validates a password
 * Requirements:
 * - Min length: 8
 * - Contains: uppercase, lowercase, digits and special character
 * @param password The user entered password
 */
export function validatePassword(password: string): string | null {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/

    if (regex.test(password)) return null
    else return "validation.format.password"
}

/**
 * Validates a name for the profile.
 *
 * Requirements:
 * - Only letters
 * - Whitespaces allowed
 *
 * @param name The name
 */
export function validateProfileName(name: string): string | null {
    const regex = /^[a-zA-Z ]{2,}$/

    if (regex.test(name)) return null
    else return "validation.format.profile_name"
}

/**
 * Validates that a date is in the past
 *
 * @param date The date
 */
export function validateInPast(date: Dayjs | null): string | null {
    const now = dayjs()

    if (date?.isBefore(now, "day")) return null
    else return "validation.format.date_past"
}

/**
 * Validates that a date is in the future
 *
 * @param date The date
 */
export function validateInFuture(date: Dayjs | null): string | null {
    const now = dayjs()

    if (date?.isAfter(now, "day")) return null
    else return "validation.format.date_future"
}

/**
 * Validates a username
 * Requirements:
 * - Only alphanumeric, digits and underscores
 * - Min length 4, max length 20
 * @param username The user entered username
 */
export function validateUsername(username: string): string | null {
    const regex = /^\w{4,20}$/

    if (regex.test(username)) return null
    else return "validation.format.username"
}

export function validateNotBlank(string: string, errorMsg: string | null = null): string | null {
    if (string.trim().length == 0)
        return errorMsg ?? "validation.format.non_empty.generic"

    return null
}

export function validateNotNull<T>(value: T | null, errorMsg: string | null = null): string | null {
    if (value == null) return errorMsg ?? "validation.format.non_empty.generic"
    else return null
}