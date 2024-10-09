import Invitation from "../../../../core/model/Invitation.ts";
import {localizedRoleName, MemberRole} from "../../../../core/model/MemberRole.ts";
import MOLDataGrid, {MOLDataGridHeaderItem} from "../../../../core/components/MOLDataGrid.tsx";
import {AccessTime, Chat, MoreVert, Person, Security, Settings, Warning} from "@mui/icons-material";
import {Box, Button, IconButton, Menu, MenuItem, Typography} from "@mui/material";
import {formatName} from "../../../../core/formatting/stringFormatting.ts";
import useBookDetailInvitationSection from "./useBookDetailInvitationSection.tsx";
import ValuedMenuState from "../../../../core/states/ValuedMenuState.ts";
import EmptyListNotice from "../../../../core/components/EmptyListNotice.tsx";
import CreateInvitationDialogContent from "./CreateInvitationDialogContent.tsx";
import Book from "../../../../core/model/Book.ts";
import MOLDialog from "../../../../core/components/dialog/MOLDialog.tsx";
import {useTranslation} from "react-i18next";
import './BookDetailInvitationSection.css'

/**
 * Props for the BookDetailInvitationSection component
 */
type BookDetailInvitationSectionProps = {

    /**
     * The book
     */
    book: Book,

    /**
     * The invitations
     */
    invitations: Invitation[],

    /**
     * Callback to refresh the invitations
     */
    refreshInvitations: () => void,

    /**
     * Role of the current user
     */
    memberRole: MemberRole,

    /**
     * Callback to revoke a given invitation
     * @param id The id of the invitation
     */
    onRevokeInvitation: (id: number) => void

}

/**
 * Component that displays the grid of invitations
 * @param props The props
 */
function InvitationGrid(
    props: Readonly<{
        invitations: Invitation[],
        onInvitationSettingsClick: (invitation: Invitation, anchor: HTMLElement) => void
    }>
) {
    const {t} = useTranslation()

    const headerItemsData = [
        {label: 'book.invitation.table.row_1', icon: <Person/>},
        {label: 'book.invitation.table.row_2', icon: <Security/>},
        {label: 'book.invitation.table.row_3', icon: <AccessTime/>},
        {label: 'book.invitation.table.row_4', icon: <Warning/>},
        {label: 'book.invitation.table.row_5', icon: <Security/>},
        {label: 'book.invitation.table.row_6', icon: <Chat/>},
        {label: 'book.invitation.table.row_7', icon: <Settings/>},
    ]

    return (
        <MOLDataGrid
            headerNodes={headerItemsData.map(header => {
                    return {
                        node: <MOLDataGridHeaderItem
                            label={t(header.label)}
                            icon={header.icon}
                            key={header.label}
                        />, id:
                        header.label
                    }
                }
            )}
            items={props.invitations}
            rowNodes={invitation => [
                {
                    node: <Typography key={1}>
                    {formatName(invitation.recipient)}
                    </Typography>, fieldName: 'recipient'
                },

                {
                    node: <Typography key={2}>
                    {formatName(invitation.author)}
                    </Typography>, fieldName: 'author'
                },

                {
                    node: <Typography
                        fontWeight={'300'}
                        key={3}
                    >
                    {t('book.invitation.table.row_3_value', {date: invitation.sentAt.toDate()})}
                    </Typography>, fieldName: 'sentAt'
                },

                {
                    node: <Typography
                    fontWeight={'300'}
                    key={4}
                >
                    {invitation.expiredAt ? t('book.invitation.table.row_4_value', {date: invitation.expiredAt.toDate()}) : '-'}
                    </Typography>, fieldName: 'expiredAt'
                },

                {
                    node: <Typography
                        fontWeight={'300'}
                        key={5}
                    >
                    {t(localizedRoleName(invitation.role))}
                    </Typography>, fieldName: 'role'
                },

                {
                    node: <Typography
                    fontWeight={'300'}
                    style={{
                        display: '-webkit-box',
                        WebkitBoxOrient: 'vertical',
                        WebkitLineClamp: 4,
                        textOverflow: 'ellipsis',
                        overflow: 'hidden'
                    }}
                    key={6}
                >
                    {invitation.message ?? '-'}
                    </Typography>, fieldName: 'message'
                },

                {
                    node: <IconButton
                        onClick={(e) => props.onInvitationSettingsClick(invitation, e.currentTarget)}
                        key={7}
                    >
                    <MoreVert/>
                    </IconButton>, fieldName: 'icon-button'
                }
            ]}
        />
    )
}

/**
 * Component for the invitations settings menu
 * @param props The props
 */
function InvitationSettingsMenu(
    props: Readonly<{
        memberRole: MemberRole,
        menuState: ValuedMenuState<Invitation>,
        onRevoke: () => void
    }>
) {
    const {t} = useTranslation()

    return (
        <Menu
            anchorEl={props.menuState.anchor}
            open={props.menuState.isOpen}
            onClose={props.menuState.close}
        >
            <MenuItem
                disabled={props.memberRole != MemberRole.Admin.valueOf()}
                onClick={props.onRevoke}>
                {t('book.invitation.settings.revoke_label')}
            </MenuItem>
        </Menu>
    )
}

/**
 * Notice for when no invitations are present. Differentiates between admins and non-admins
 * @param props The props
 */
function NoInvitationsNotice(
    props: {
        memberRole: MemberRole,
        onAction: () => void
    }
) {
    const {t} = useTranslation()

    return (
        props.memberRole == MemberRole.Admin ?
            <EmptyListNotice
                preText={t('book.invitation.empty_list.admin.pre')}
                clickableText={t('book.invitation.empty_list.admin.action')}
                postText={t('book.invitation.empty_list.admin.post')}
                onAction={props.onAction}
            />
            : <EmptyListNotice
                preText={t('book.invitation.empty_list.generic.pre')}
                clickableText={t('book.invitation.empty_list.generic.action')}
                postText={t('book.invitation.empty_list.generic.post')}
                onAction={props.onAction}
            />

    )
}

/**
 * Component for the section that displays the open invitations for a book
 */
export default function BookDetailInvitationSection(props: Readonly<BookDetailInvitationSectionProps>) {
    const {t} = useTranslation()

    const {invitationSettingsMenuState, createInvitationDialogState} = useBookDetailInvitationSection()

    return (
        <Box>
            <InvitationGrid
                invitations={props.invitations}
                onInvitationSettingsClick={invitationSettingsMenuState.open}
            />

            {props.invitations.length == 0 ?
                <NoInvitationsNotice
                    memberRole={props.memberRole}
                    onAction={createInvitationDialogState.open}
                />
                : null}

            {props.invitations.length != 0 ?
                <Box className="invitation-button-container">
                    <Button
                        variant={'contained'}
                        disabled={props.memberRole != MemberRole.Admin}
                        onClick={() => createInvitationDialogState.open()}
                    >
                        {t('book.invitation.invite_button_label')}
                    </Button>
                </Box>
                : null}

            <InvitationSettingsMenu
                memberRole={props.memberRole}
                menuState={invitationSettingsMenuState}
                onRevoke={() => {
                    props.onRevokeInvitation(invitationSettingsMenuState.data!.id)
                    invitationSettingsMenuState.close()
                }}
            />

            <MOLDialog dialogState={createInvitationDialogState}>
                <CreateInvitationDialogContent
                    book={props.book}
                    refreshInvitations={props.refreshInvitations}
                    dialogState={createInvitationDialogState}
                />
            </MOLDialog>
        </Box>
    )
}