import PendingApiResponse from "../core/model/PendingApiResult.ts";
import Book from "../core/model/Book.ts";
import Invitation from "../core/model/Invitation.ts";
import {useAuth} from "../core/useAuth.ts";
import useApiCallPending from "../core/hooks/useApiCallPending.ts";
import {acceptInvitationApiCall, denyInvitationApiCall, fetchInvitations} from "../core/network/invitationCalls.ts";
import {createBookApiCall, fetchUserBooks} from "../core/network/lawCalls.ts";
import ValuedDialogState, {useDialogState} from "../core/states/ValuedDialogState.ts";
import {useState} from "react";

/**
 * Return type of the useHomeScreen hook
 */
type UseHomeScreen = {

    /**
     * The invitation dialog state
     */
    invitationDialogState: ValuedDialogState<Invitation>,

    /**
     * The dialog state for the add book dialog
     */
    addBookDialogState: ValuedDialogState<Book | null>,

    /**
     * The books
     */
    books: PendingApiResponse<Book[]>,

    /**
     * The invitations
     */
    invitations: PendingApiResponse<Invitation[]>,

    /**
     * Creates a book.
     *
     * @param name The name of the book
     * @param key The key of the book
     * @param description The description of the book
     */
    addBook(name: string, key: string, description: string): Promise<void>,

    /**
     * Whether the add-book call is loading
     */
    addBookLoading: boolean,

    /**
     * Accepts a specific invitation
     * @param id The id
     */
    acceptInvitation(id: number): Promise<void>,

    /**
     * Whether the accept-invitation call is loading
     */
    acceptInvitationLoading: boolean,

    /**
     * Denies a specific invitation
     * @param id The id
     */
    denyInvitation(id: number): Promise<void>,

    /**
     * Whether the deny-invitation call is loading
     */
    denyInvitationLoading: boolean,

    /**
     * Refreshes the books
     */
    refreshBooks: () => Promise<void>

}

/**
 * Accepts a given invitation
 * @param id The id
 * @param setIsAcceptLoading Callback to set the loading state
 */
const accept = async (
    id: number,
    setIsAcceptLoading: (isLoading: boolean) => void
): Promise<void> => {
    setIsAcceptLoading(true)

    await acceptInvitationApiCall(id)
    setIsAcceptLoading(false)
}

/**
 * Denies a given invitation
 * @param id The id
 * @param setIsDenying Callback to set the loading state
 */
const deny = async (
    id: number,
    setIsDenying: (isLoading: boolean) => void
): Promise<void> => {
    setIsDenying(true)

    await denyInvitationApiCall(id)
    setIsDenying(false)
}

/**
 * Adds a book.
 *
 * @param name The name of the book
 * @param key The key of the book
 * @param description The description of the book
 * @param setIsAddingBook Callback to set the loading state
 */
const addBook = async (
    name: string,
    key: string,
    description: string,
    setIsAddingBook: (isLoading: boolean) => void
): Promise<void> => {
    setIsAddingBook(true)
    await createBookApiCall(name, key, description)
    setIsAddingBook(false)
}

/**
 * Home screen hook
 */
const useHomeScreen = (): UseHomeScreen => {
    const auth = useAuth()

    const invitationDialogState = useDialogState<Invitation>(false)
    const addBookDialogState = useDialogState<Book | null>(false)

    const [isAddBookLoading, setIsAddBookLoading] = useState(false);
    const [isAcceptLoading, setIsAcceptLoading] = useState(false);
    const [isDenyLoading, setIsDenyLoading] = useState(false);

    const books = useApiCallPending(() => fetchUserBooks()).map(books =>
        books.filter(book => book.isMemberOf))

    const invitations = useApiCallPending(() => fetchInvitations({onlyInvitedBy: auth.authenticatedUser!.id}))

    return {
        invitationDialogState,
        addBookDialogState,
        books,
        invitations,
        async addBook(name: string, key: string, description: string): Promise<void> {
            await addBook(name, key, description, setIsAddBookLoading)
            addBookDialogState.close()
            books.refresh()
        },
        addBookLoading: isAddBookLoading,
        async acceptInvitation(id: number): Promise<void> {
            await accept(id, setIsAcceptLoading)
            invitationDialogState.close()
            books.refresh()
            invitations.refresh()
        },
        acceptInvitationLoading: isAcceptLoading,
        async denyInvitation(id: number): Promise<void> {
            await deny(id, setIsDenyLoading)
            invitationDialogState.close()
            books.refresh()
            invitations.refresh()
        },
        denyInvitationLoading: isDenyLoading,
        async refreshBooks(): Promise<void> {
            books.refreshSilent()
        }
    }
}

export default useHomeScreen