import {Box} from "@mui/material";
import './HomeScreen.css'
import SectionDisplay, {BaseSectionDisplay} from "./components/SectionDisplay.tsx";
import useHomeScreen from "./useHomeScreen.ts";
import BookCard from "../core/components/book/BookCard.tsx";
import InvitationItem from "../core/components/invitation/InvitationItem.tsx";
import InvitationDialog from "../core/components/invitation/InvitationDialog.tsx";
import MaybeVisible from "../core/components/MaybeVisible.tsx";
import {useNavigate} from "react-router-dom";
import Book from "../core/model/Book.ts";
import {useTranslation} from "react-i18next";
import EmptyListNotice from "../core/components/EmptyListNotice.tsx";
import CreateBookDialogContent from "./components/CreateBookDialogContent.tsx";
import CivorisDialog from "../core/components/dialog/CivorisDialog.tsx";

function BookSectionDisplay(
    props: Readonly<{
        hasBooks: boolean | null,
        onAddBook: () => void
    }>
) {
    const {t} = useTranslation()

    const title = t('home.sections.books.title')
    const booksDescription = t('home.sections.books.description.existing')
    const noBooksPre = t('home.sections.books.description.empty.pre')
    const noBooksClickable = t('home.sections.books.description.empty.clickable')
    const noBooksPost = t('home.sections.books.description.empty.post')

    if (props.hasBooks == null) {
        return (
            <SectionDisplay
                title={title}
                description={""}/>
        )
    } else if (props.hasBooks) {
        return (
            <SectionDisplay
                title={title}
                description={booksDescription}/>
        )
    } else {
        return (
            <BaseSectionDisplay
                title={title}
            >
                <EmptyListNotice
                    preText={noBooksPre}
                    clickableText={noBooksClickable}
                    postText={noBooksPost}
                    onAction={props.onAddBook}
                    textStartAlign={true}
                />
            </BaseSectionDisplay>
        )
    }
}

/**
 * Component for the home screen
 * @constructor
 */
export default function HomeScreen() {
    const navigate = useNavigate()
    const {t} = useTranslation()

    const {
        invitationDialogState,
        addBookDialogState,
        books,
        invitations,
        acceptInvitation,
        denyInvitation,
        addBook,
        refreshBooks
    } = useHomeScreen()

    const onBookClickAction = (book: Book) => navigate(`/law-books/${book.id}/`)

    const hasBooks = books.resolve(
        books => books.length != 0,
        null
    )
    const invitationsDescriptionMessage = invitations.resolve(
        invitations => invitations.length == 0 ? t('home.sections.invitations.description.empty')
            : t('home.sections.invitations.description.existing'),
        ""
    )

    return (
        <Box className="home-screen">
            <Box className="books-section">
                <BookSectionDisplay
                    hasBooks={hasBooks}
                    onAddBook={() => addBookDialogState.open(null)}
                />
                <MaybeVisible
                    apiResult={books}
                    content={state => <Box
                        className="books-container"
                    >
                        {state.map(book =>
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
                    apiResult={invitations}
                    content={state => <Box
                        className="invitations-container"
                    >
                        {state.map(invitation =>
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

            <CivorisDialog dialogState={addBookDialogState}>
                <CreateBookDialogContent
                    dialogState={addBookDialogState}
                    onConfirm={addBook}
                    refreshBooks={refreshBooks}
                />
            </CivorisDialog>
        </Box>
    )
}