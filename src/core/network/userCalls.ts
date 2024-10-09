import {ApiResult, authenticatedApiCall} from "./base/apiCall.ts";
import ForeignUser from "../model/ForeignUser.ts";
import ForeignUserResponse from "./responses/ForeignUserResponse.ts";
import {mapBookMember, mapForeignUser, mapUser} from "../mapping/userMapping.ts";
import User from "../model/User.ts";
import AuthUserWithProfileResponse from "./responses/AuthUserWithProfileResponse.ts";
import UserWithMemberRoleResponse from "./responses/UserWithMemberRoleResponse.ts";
import BookMember from "../model/BookMember.ts";
import {MemberRole, memberRoleFromNumber} from "../model/MemberRole.ts";

/**
 * Sets the profile of the user
 */
export default async function setUserProfile(
    firstName: string,
    lastName: string,
    birthday: string,
    gender: string
): Promise<ApiResult<User>> {
    const response = await authenticatedApiCall<AuthUserWithProfileResponse>(
        "/user/profile/",
        {firstName: firstName, lastName: lastName, birthday: birthday, gender: gender},
        "post"
    )

    return response.map(mapUser)
}

/**
 * Fetches a foreign user by its id
 * @param id The id
 */
export async function fetchForeignUser(id: number): Promise<ApiResult<ForeignUser>> {
    const response = await authenticatedApiCall<ForeignUserResponse>(
        `/users/${id}/`,
        undefined,
        "get"
    )

    return response.map(mapForeignUser)
}

/**
 * Fetches all users
 */
export async function fetchAllForeignUsers(): Promise<ApiResult<ForeignUser[]>> {
    const response = await authenticatedApiCall<ForeignUserResponse[]>(
        `/users/`,
        undefined,
        'get'
    )

    return response.map(users => users.map(mapForeignUser))
}

/**
 * Gets the members of a specific book
 * @param id The book id
 */
export async function fetchMembersOfBook(id: number): Promise<ApiResult<BookMember[]>> {
    const response = await authenticatedApiCall<UserWithMemberRoleResponse[]>(
        `/law-books/${id}/roles/`,
        undefined,
        'get'
    )

    return response.map(users => users.map(mapBookMember))
}

/**
 * Fetches the member role of a specific user in a specific book
 * @param userId The id of the user
 * @param bookId The id of the book
 */
export async function fetchMemberRoleInBook(userId: number, bookId: number): Promise<ApiResult<MemberRole>> {
    const response = await authenticatedApiCall<UserWithMemberRoleResponse>(
        `/law-books/${bookId}/roles/${userId}/`,
        undefined,
        'get'
    )

    return response.map(r => memberRoleFromNumber(r.role))
}