import {ApiResult, authenticatedApiCall, flattenApiResultList} from "./base/apiCall.ts";
import InvitationResponse from "./responses/InvitationResponse.ts";
import Invitation from "../model/Invitation.ts";
import dayjs, {Dayjs} from "dayjs";
import {fetchBook} from "./lawCalls.ts";
import {mapBook} from "../mapping/lawMapping.ts";
import {mapInvitation} from "../mapping/invitationMapping.ts";
import InvitationStatus from "../model/InvitationStatus.ts";
import {fetchForeignUser} from "./userCalls.ts";
import {MemberRole} from "../model/MemberRole.ts";

/**
 * Config for the userUserInvitations hook
 */
type FetchInvitationsQuery = {

    /**
     * Only get the invitations where the user with that id was invited
     */
    onlyInvitedBy?: number,

    /**
     * Only get invitations where the user with that id was the author
     */
    onlyAuthored?: number,

    /**
     * Only get invitations that are in the book with that id
     */
    onlyInBook?: number,

    /**
     * Whether to also include invitations that are not status 'OPEN'
     */
    alsoInactive?: boolean,

    /**
     * Whether to also include expired invitations
     */
    alsoExpired?: boolean

}

async function populateInvitationResponse(invitationResult: ApiResult<InvitationResponse[]>, query: FetchInvitationsQuery): Promise<ApiResult<Invitation[]>> {
    const filteredInvitationResult = invitationResult.map(invitations =>
        invitations.filter(invitation => {
            const isExpired = invitation.expiredAt ? dayjs(invitation.expiredAt) > dayjs() : true
            const r = [
                query.onlyInvitedBy ? invitation.recipientId == query.onlyInvitedBy : true,
                query.onlyAuthored ? invitation.authorId == query.onlyAuthored : true,
                query.onlyInBook ? invitation.targetBookId == query.onlyInBook : true,
                query.alsoInactive ? true : invitation.status == InvitationStatus.Open.valueOf(),
                query.alsoExpired ? isExpired : true
            ]


            return r.every(b => b)
        })
    )

    return filteredInvitationResult.combineWithMap3(
        async invitations => {
            const authors = await Promise.all(invitations.map(inv => fetchForeignUser(inv.authorId)))
            return flattenApiResultList(authors)
        },
        async invitations => {
            const books = await Promise.all(invitations.map(inv => fetchBook(inv.targetBookId)))
            return flattenApiResultList(books).map(books => books.map(mapBook))
        },
        async invitations => {
            const authors = await Promise.all(invitations.map(inv => fetchForeignUser(inv.recipientId)))
            return flattenApiResultList(authors)
        },
        (invitations, authors, books, recipients) => {
            return invitations.map(inv => {
                const i = invitations.indexOf(inv)

                return mapInvitation(
                    inv,
                    authors[i],
                    books[i],
                    recipients[i]
                )
            })
        }
    )
}

/**
 * Fetches the invitations for the user
 */
export async function fetchInvitations(query: FetchInvitationsQuery): Promise<ApiResult<Invitation[]>> {
    const invitationResult = await authenticatedApiCall<InvitationResponse[]>(
        "/user/book-invitations/",
        undefined,
        "get"
    )

    return populateInvitationResponse(invitationResult, query)
}

/**
 * Api call to accept an invitation
 * @param id The id of the invitation
 */
export async function acceptInvitationApiCall(id: number): Promise<ApiResult<void>> {
    return authenticatedApiCall(
        `/book-invitations/${id}/accept/`,
        undefined,
        'post'
    )
}

/**
 * Api call to deny an invitation
 * @param id The id of the invitation
 */
export async function denyInvitationApiCall(id: number): Promise<ApiResult<void>> {
    return authenticatedApiCall(
        `/book-invitations/${id}/deny/`,
        undefined,
        'post'
    )
}

/**
 * Api call to revoke an invitation
 * @param id The id of the invitation
 */
export async function revokeInvitationApiCall(id: number): Promise<ApiResult<void>> {
    return authenticatedApiCall(
        `/book-invitations/${id}/revoke/`,
        undefined,
        'post'
    )
}

/**
 * Creates a new invitation
 * @param bookId The id of the book
 * @param recipientId The id of the recipient user
 * @param role The role
 * @param expiresAt The expiration date
 * @param message The message
 */
export async function createInvitationApiCall(
    bookId: number,
    recipientId: number,
    role: MemberRole,
    expiresAt: Dayjs | null,
    message: string | null
): Promise<ApiResult<void>> {
    return authenticatedApiCall(
        `/law-books/${bookId}/book-invitations/`,
        {
            recipientId: recipientId,
            role: role.valueOf(),
            expiresAt: expiresAt?.toDate().toISOString(),
            message: message
        },
        'post'
    )
}
