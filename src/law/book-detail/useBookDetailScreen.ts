import PendingApiResult from "../../core/model/PendingApiResult.ts";
import Book from "../../core/model/Book.ts";
import {useParams} from "react-router-dom";
import useApiCallPending from "../../core/hooks/useApiCallPending.ts";
import {
    changeMemberRoleApiCall,
    fetchBook,
    fetchEntriesInBook,
    fetchSectionsForEntries,
    removeUserFromBookApiCall
} from "../../core/network/lawCalls.ts";
import BookMember from "../../core/model/BookMember.ts";
import {fetchMemberRoleInBook, fetchMembersOfBook} from "../../core/network/userCalls.ts";
import Entry from "../../core/model/Entry.ts";
import Section from "../../core/model/Section.ts";
import {useState} from "react";
import {MemberRole} from "../../core/model/MemberRole.ts";
import {useAuth} from "../../core/useAuth.ts";
import Invitation from "../../core/model/Invitation.ts";
import {fetchInvitations, revokeInvitationApiCall} from "../../core/network/invitationCalls.ts";

/**
 * The tabs in the book-detail screen
 */
export enum BookDetailTab {

    /**
     * The members
     */
    Members,

    /**
     * The content
     */
    Content,

    /**
     * The invitations
     */
    Invitations

}

/**
 * Gets the localized name for a tab
 * @param tab The tab
 */
export function localizedNameForTab(tab: BookDetailTab): string {
    if (tab == BookDetailTab.Invitations) return "book.tabs.invitations.label"
    else if (tab == BookDetailTab.Content) return "book.tabs.content.label"
    else return "book.tabs.members.label"
}

/**
 * The type of the useBookDetailScreen
 */
type UseBookDetailScreen = {

    /**
     * The book
     */
    book: PendingApiResult<Book>,

    /**
     * The members of the book
     */
    members: PendingApiResult<BookMember[]>,

    /**
     * The entries for the specific book
     */
    entries: PendingApiResult<Entry[]>,

    /**
     * The sections for each entry in the book
     */
    sections: PendingApiResult<Map<number, Section[]>>,

    /**
     * The member role of the currently logged-in user for the selected book
     */
    memberRole: PendingApiResult<MemberRole>,

    /**
     * The open invitations for the current book
     */
    openInvitations: PendingApiResult<Invitation[]>

    /**
     * The currently selected tab
     */
    selectedTab: BookDetailTab,

    /**
     * Selects a new tab
     * @param tab The new tab
     */
    selectTab: (tab: BookDetailTab) => void,

    /**
     * Handler for updating a users role
     * @param userId The user id
     * @param memberRole The new member role
     */
    updateUserRole: (userId: number, memberRole: MemberRole) => Promise<void>,

    /**
     * Handler for removing a user from the book
     * @param userId The user id
     */
    removeUser: (userId: number) => Promise<void>,

    /**
     * Handler for revoking a certain invitation
     */
    revokeInvitation: (id: number) => Promise<void>

}

/**
 * The path params for the book-detail route
 */
type BookDetailParams = {

    /**
     * The book id
     */
    bookId: string

}

/**
 * Updates the role of a user
 * @param userId The id of the user
 * @param memberRole The new member role
 * @param book The book
 * @param members The members
 * @param userMemberRole The member role of the user
 */
const updateUserRole = async (
    userId: number,
    memberRole: MemberRole,
    book: PendingApiResult<Book>,
    members: PendingApiResult<BookMember[]>,
    userMemberRole: PendingApiResult<MemberRole>
): Promise<void> => {
    if (book.data) {
        await changeMemberRoleApiCall(userId, book.data.id, memberRole)
    }

    members.refreshSilent()
    userMemberRole.refreshSilent()
}

/**
 * Removes a user
 * @param userId The id of the user
 * @param book The book
 * @param members The members
 */
const removeUser = async (
    userId: number,
    book: PendingApiResult<Book>,
    members: PendingApiResult<BookMember[]>
): Promise<void> => {
    if (book.data) {
        await removeUserFromBookApiCall(userId, book.data.id)
    }

    members.refreshSilent()
}

/**
 * Revokes an invitation
 * @param id The id of the invitation
 * @param invitations The invitations
 */
const revokeInvitation = async (
    id: number,
    invitations: PendingApiResult<Invitation[]>
): Promise<void> => {
    await revokeInvitationApiCall(id)

    invitations.refreshSilent()
}

/**
 * Hook for the BookDetailScreen
 */
const useBookDetailScreen = (): UseBookDetailScreen => {
    const [selectedTab, setSelectedTab] = useState(BookDetailTab.Content)

    const auth = useAuth()

    const {bookId: _bookId} = useParams<BookDetailParams>()
    const bookId = parseInt(_bookId ?? '-1') || -1

    const bookApiResult = useApiCallPending(() => fetchBook(bookId))
    const membersApiResult = useApiCallPending(() => fetchMembersOfBook(bookId))
    const entriesApiResult = useApiCallPending(() => fetchEntriesInBook(bookId))
    const memberRoleApiResult = useApiCallPending(() => fetchMemberRoleInBook(auth.authenticatedUser!.id, bookId))
    const invitationsApiResult = useApiCallPending(() => fetchInvitations({onlyInBook: bookId}))

    const shouldDoLoading = !entriesApiResult.isFinishedSuccess
    const entriesIds = entriesApiResult.isFinishedSuccess ? entriesApiResult.data!.map(entry => entry.id) : undefined
    const sectionsApiResult = useApiCallPending(() => fetchSectionsForEntries(entriesIds!), shouldDoLoading)


    return {
        book: bookApiResult,
        members: membersApiResult,
        entries: entriesApiResult,
        sections: sectionsApiResult,
        memberRole: memberRoleApiResult,
        openInvitations: invitationsApiResult,
        selectedTab: selectedTab,
        selectTab: setSelectedTab,
        async updateUserRole(userId: number, memberRole: MemberRole): Promise<void> {
            await updateUserRole(userId, memberRole, bookApiResult, membersApiResult, memberRoleApiResult)
        },
        async removeUser(userId: number): Promise<void> {
            await removeUser(userId, bookApiResult, membersApiResult)
        },
        async revokeInvitation(id: number) {
            await revokeInvitation(id, invitationsApiResult)
        }
    }
}

export default useBookDetailScreen