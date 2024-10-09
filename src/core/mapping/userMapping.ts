import ForeignUserResponse from "../network/responses/ForeignUserResponse.ts";
import ForeignUser from "../model/ForeignUser.ts";
import dayjs from "dayjs";
import Gender, {genderFromString} from "../model/Gender.ts";
import AuthUserWithProfileResponse from "../network/responses/AuthUserWithProfileResponse.ts";
import User from "../model/User.ts";
import UserWithMemberRoleResponse from "../network/responses/UserWithMemberRoleResponse.ts";
import BookMember from "../model/BookMember.ts";
import {memberRoleFromNumber} from "../model/MemberRole.ts";

/**
 * Maps a foreign user response to a model
 * @param foreignUser The response
 */
export function mapForeignUser(foreignUser: ForeignUserResponse): ForeignUser {
    return {
        id: foreignUser.id,
        username: foreignUser.username,
        profile: {
            firstName: foreignUser.profile.firstName,
            lastName: foreignUser.profile.lastName,
            birthday: dayjs(foreignUser.profile.birthday),
            gender: genderFromString(foreignUser.profile.gender) ?? Gender.Other
        }
    }
}

/**
 * Maps an auth user with profile to a user model
 * @param authUserWithProfile The response
 */
export function mapUser(authUserWithProfile: AuthUserWithProfileResponse): User {
    return {
        id: authUserWithProfile.id,
        email: authUserWithProfile.email,
        username: authUserWithProfile.username,
        isEmailVerified: authUserWithProfile.isEmailVerified,
        profile: {
            firstName: authUserWithProfile.profile.firstName,
            lastName: authUserWithProfile.profile.lastName,
            birthday: dayjs(authUserWithProfile.profile.birthday),
            gender: genderFromString(authUserWithProfile.profile.gender) ?? Gender.Other
        }
    }
}

/**
 * Maps a user with the corresponding member role
 * @param user The user with the member role
 */
export function mapBookMember(user: UserWithMemberRoleResponse): BookMember {
    return {
        memberRole: memberRoleFromNumber(user.role),
        ...mapForeignUser(user.user)
    }
}