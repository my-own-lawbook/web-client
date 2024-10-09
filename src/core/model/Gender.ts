/**
 * Collection of available genders
 */
enum Gender {

    /**
     * Male
     */
    Male = "male",

    /**
     * Female
     */
    Female = "female",

    /**
     * Other
     */
    Other = "other",

    /**
     * Private
     */
    Private = "disclosed"

}

export default Gender

/**
 * Creates a gender from a string
 * @param str The string
 * @return The gender, or null if none was found
 */
export function genderFromString(str: string): Gender | null {
    if (str == "male") return Gender.Male
    else if (str == "female") return Gender.Female
    else if (str == "disclosed") return Gender.Private
    else if (str == "other") return Gender.Other
    else return null
}

/**
 * Creates a display string for a given gender
 * @param gender The gender
 */
export function genderDisplayName(gender: Gender): string {
    if (gender == Gender.Male) return "Male"
    else if (gender == Gender.Female) return "Female"
    else if (gender == Gender.Private) return "I don't want to share this information"
    else return "Other"
}