import {Box} from "@mui/material";
import './HomeScreen.css'
import SectionDisplay from "./components/SectionDisplay.tsx";
import useHomeScreen from "./useHomeScreen.ts";
import BookCard from "../core/components/book/BookCard.tsx";
import InvitationItem from "../core/components/invitation/InvitationItem.tsx";
import InvitationDialog from "../core/components/invitation/InvitationDialog.tsx";
import MaybeVisible from "../core/components/MaybeVisible.tsx";
import {useNavigate} from "react-router-dom";
import Book from "../core/model/Book.ts";
import {useTranslation} from "react-i18next";

/**
 * Component for the home screen
 * @constructor
 */
export default function HomeScreen() {
    const navigate = useNavigate()
    const {t} = useTranslation()

    const {
        invitationDialogState,
        books,
        invitations,
        acceptInvitation,
        denyInvitation
    } = useHomeScreen()

    const isBooksLoading = !books.isFinishedSuccess
    const isInvitationsLoading = !invitations.isFinishedSuccess

    const onBookClickAction = (book: Book) => navigate(`/law-books/${book.id}/`)

    const booksDescriptionMessage = books.resolve(
        books => books.length == 0 ? t('home.sections.books.description.empty')
            : t('home.sections.books.description.existing'),
        ""
    )
    const invitationsDescriptionMessage = invitations.resolve(
        invitations => invitations.length == 0 ? t('home.sections.invitations.description.empty')
            : t('home.sections.invitations.description.existing'),
        ""
    )

    return (
        <Box className="home-screen">
            <Box className="books-section">
                <SectionDisplay
                    title={t('home.sections.books.title')}
                    description={booksDescriptionMessage}/>
                <MaybeVisible
                    isLoading={isBooksLoading}
                    content={() => <Box
                        className="books-container"
                    >
                        {books.data!.map(book =>
                            <BookCard
                                book={book}
                                onClick={onBookClickAction}
                                key={book.id}
                            />
                        )}
                    </Box>}
                />

            </Box>

            <Box className="invitations-section">
                <SectionDisplay
                    title={t('home.sections.invitations.title')}
                    description={invitationsDescriptionMessage}/>
                <MaybeVisible
                    isLoading={isInvitationsLoading}
                    content={() => <Box
                        className="invitations-container"
                    >
                        {invitations.data!.map(invitation =>
                            <InvitationItem
                                invitation={invitation}
                                onClick={() => invitationDialogState.open(invitation)}
                                key={invitation.id}
                            />
                        )}
                    </Box>}
                />

            </Box>

            <InvitationDialog
                dialogState={invitationDialogState}
                onAccept={acceptInvitation}
                onDeny={denyInvitation}
            />
        </Box>
    )
}