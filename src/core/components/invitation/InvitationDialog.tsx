import Invitation from "../../model/Invitation.ts";
import {Box, Button, DialogActions, DialogContent, DialogTitle, Typography} from "@mui/material";
import {formatName} from "../../formatting/stringFormatting.ts";
import ForeignUser from "../../model/ForeignUser.ts";
import Book from "../../model/Book.ts";
import './InvitationDialog.css'
import {Dayjs} from "dayjs";
import {localizedRoleName, MemberRole} from "../../model/MemberRole.ts";
import ValuedDialogState from "../../states/ValuedDialogState.ts";
import MOLDialog from "../dialog/MOLDialog.tsx";
import {Trans, useTranslation} from "react-i18next";

/**
 * Props for the invitation dialog
 */
type InvitationDialogProps = {

    /**
     * The dialog state
     */
    dialogState: ValuedDialogState<Invitation>,

    /**
     * The accept callback
     */
    onAccept: (id: number) => void

    /**
     * The deny callback
     */
    onDeny: (id: number) => void

}

/**
 * Component for the sentence that summarizes the book and author the invitation is about
 * @param props The props
 */
function AuthorAndBookSummary(
    props: {
        author: ForeignUser,
        book: Book
    }
) {
    return (
        <Typography>
            <Trans
                i18nKey={'components.dialog.invitation.base_info'}
                values={{
                    author: formatName(props.author),
                    book: props.book.name
                }}
            >
                _
                <b>_</b>
                _
                <b>_</b>
                _
            </Trans>
        </Typography>
    )
}

/**
 * Will display a field that contains the custom invitation message
 * @param props The props
 */
function InvitationMessage(
    props: {
        message: string
    }
) {
    return (
        <Box className="invitation-dialog-message-wrapper">
            <Typography className="invitation-dialog-message">
                {props.message}
            </Typography>
        </Box>
    )
}

/**
 * Will display the expiration period for an invitation
 * @param props The props
 */
function ExpirationInfo(
    props: {
        expiresAt: Dayjs
    }
) {
    return (
        <Typography>
            <Trans
                i18nKey='components.dialog.invitation.expiration_info'
                values={{
                    date: props.expiresAt.toDate(),
                    time: props.expiresAt.toDate()
                }}
            >
                _
                <b>_</b>
                _

            </Trans>
        </Typography>
    )
}

/**
 * Will display the role the user will be granted in the book
 * @param props The props
 */
function RoleInfo(
    props: {
        role: MemberRole
    }
) {
    const {t} = useTranslation()

    return (
        <Typography>
            <Trans
                i18nKey='components.dialog.invitation.role_info'
                values={{role: t(localizedRoleName(props.role))}}
            >
                _
                <b>_</b>
                _
            </Trans>
        </Typography>
    )
}

/**
 * Component that contains the content of the invitation dialog, except the title and buttons
 * @param props The props
 */
function InvitationDialogContent(
    props: {
        invitation: Invitation
    }
) {
    return (
        <DialogContent className="invitation-dialog-content">
            <AuthorAndBookSummary author={props.invitation.author} book={props.invitation.targetBook}/>
            {props.invitation.message ?
                <InvitationMessage message={props.invitation.message}/>
                : null}
            {props.invitation.expiredAt ?
                <ExpirationInfo expiresAt={props.invitation.expiredAt}/>
                : null}
            <RoleInfo role={props.invitation.role}/>
        </DialogContent>
    )
}

/**
 * Component for a invitation dialog
 * @param props The props
 */
export default function InvitationDialog(props: InvitationDialogProps) {
    const {t} = useTranslation()

    return (
        <MOLDialog
            dialogState={props.dialogState}
        >
            <DialogTitle>{t('components.dialog.invitation.title', {name: props.dialogState.data?.targetBook.name ?? ''})}</DialogTitle>
            {
                props.dialogState.data ?
                    <InvitationDialogContent invitation={props.dialogState.data}/>
                    : null
            }
            <DialogActions>
                <Button
                    variant={'outlined'}
                    color={'error'}
                    onClick={() => props.onDeny(props.dialogState.data!.id)}
                >
                    {t('components.dialog.invitation.decline_button_label')}
                </Button>

                <Button
                    variant={'contained'}
                    onClick={() => props.onAccept(props.dialogState.data!.id)}
                >
                    {t('components.dialog.invitation.accept_button_label')}
                </Button>
            </DialogActions>
        </MOLDialog>
    )
}