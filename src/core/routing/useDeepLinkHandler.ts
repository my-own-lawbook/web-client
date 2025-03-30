import {useSearchParams} from "react-router-dom";
import useApiCallPending from "../hooks/useApiCallPending.ts";
import {fetchInvitation} from "../network/invitationCalls.ts";
import Book from "../model/Book.ts";

const SEARCH_OTP = "otp"
const SEARCH_INVITATION_ID = "id"

const DL_PREFIX = "/l/"
const HTTPS_PROTOCOL = "https:"
const HTTP_PROTOCOL = "http:"
const DL_PROTOCOL = "civoris:"

const DL_EMAIL_VERIFY = DL_PREFIX + "email-verify"
const DL_INVITATION_NEW = DL_PREFIX + "invitation-new"
const DL_INVITATION_DENIED = DL_PREFIX + "invitation-denied"
const DL_INVITATION_ACCEPTED = DL_PREFIX + "invitation-accepted"
const DL_INVITATION_REVOKED = DL_PREFIX + "invitation-revoked"

const BOOK_DETAIL_ID = "{book_id}"
const OTP = "{otp}"

const WEB_TARGET_HOME = "/"
const WEB_TARGET_BOOK_DETAIL = `/law-books/${BOOK_DETAIL_ID}`
const WEB_TARGET_EMAIL_VERIFY = `/auth/signup/email-verify?${SEARCH_OTP}=${OTP}`

/**
 * States the deep link redirection can be in.
 */
export enum DeepLinkHandlerState {

    /**
     * The redirection is loading, i.e. figuring out the link to redirect to.
     */
    LOADING,

    /**
     * The redirection has failed, e.g. a query parameter was missing or invalid.
     */
    FAILED,

    /**
     * The user has already been redirected.
     */
    REDIRECTED

}

/**
 * The value of the hook.
 */
export interface RedirectLinkBundle {

    /**
     * The redirection link for the browser.
     */
    webTarget: string,

    /**
     * The deep link to redirect mobile users to.
     */
    deepLinkTarget: string

}

/**
 * Hook that manages the redirection and link creation for dynamic links.
 *
 * @returns The result of the hook. Null if the links are being processed, and undefined if the
 */
const useDeepLinkHandler = (): RedirectLinkBundle | DeepLinkHandlerState => {
    const searchParams = useSearchParams()[0]

    const url = URL.parse(window.location.href)!

    const invitationId = parseInt(searchParams.get(SEARCH_INVITATION_ID) ?? "")
    const otp = searchParams.get(SEARCH_OTP)

    const invitationResponse = useApiCallPending(
        () => fetchInvitation(invitationId),
        {doError: !invitationId}
    )

    let webTarget: string

    switch (url.pathname) {
        case DL_INVITATION_NEW: {
            webTarget = createLinkHome()
            break
        }
        case DL_INVITATION_REVOKED: {
            webTarget = createLinkHome()
            break
        }
        case DL_INVITATION_DENIED:
        case DL_INVITATION_ACCEPTED: {
            if (invitationResponse.isLoading) {
                return DeepLinkHandlerState.LOADING
            } else if (invitationResponse.isError) {
                return DeepLinkHandlerState.FAILED
            }
            webTarget = createLinkBookDetail(invitationResponse.data!.targetBook)

            break
        }
        case DL_EMAIL_VERIFY: {
            if (!otp) {
                return DeepLinkHandlerState.FAILED
            }
            webTarget = createEmailVerify(otp)

            break
        }
        default: {
            return DeepLinkHandlerState.FAILED
        }
    }

    return createLinks(url, webTarget)
}

export default useDeepLinkHandler

/**
 * Creates the link bundle.
 *
 * @param url The current url
 * @param webTarget The target link for browser users
 */
function createLinks(url: URL, webTarget: string): RedirectLinkBundle {
    return {
        webTarget: webTarget,
        deepLinkTarget: buildDeepLink(url)
    }

}

/**
 * Creates the link to the home site.
 */
function createLinkHome(): string {
    return WEB_TARGET_HOME

}

/**
 * Creates the link to the book detail page.
 *
 * @param book The book to redirect to
 */
function createLinkBookDetail(book: Book): string {
    return WEB_TARGET_BOOK_DETAIL.replace(BOOK_DETAIL_ID, book.id.toString())

}

/**
 * Creates the link to the email verify page.
 *
 * @param otp The otp to enter automatically
 */
function createEmailVerify(otp: string): string {
    return WEB_TARGET_EMAIL_VERIFY.replace(OTP, otp)

}

/**
 * Creates the deep-link url for mobile users. Simply removes the '/l' prefix.
 *
 * @param url The deep-link to be received by the app
 */
function buildDeepLink(url: URL) {
    url.pathname = url.pathname.substring(3)
    return url.toString()
        .replace(HTTPS_PROTOCOL, DL_PROTOCOL)
        .replace(HTTP_PROTOCOL, DL_PROTOCOL)

}
