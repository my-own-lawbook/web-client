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
    props: {
        invitations: Invitation[],
        onInvitationSettingsClick: (invitation: Invitation, anchor: HTMLElement) => void
    }
) {
    const {t} = useTranslation()

    return (
        <MOLDataGrid
            headerNodes={[
                <MOLDataGridHeaderItem
                    label={t('book.invitation.table.row_1')}
                    icon={<Person/>}
                />,
                <MOLDataGridHeaderItem
                    label={t('book.invitation.table.row_2')}
                    icon={<Security/>}
                />,
                <MOLDataGridHeaderItem
                    label={t('book.invitation.table.row_3')}
                    icon={<AccessTime/>}
                />,
                <MOLDataGridHeaderItem
                    label={t('book.invitation.table.row_4')}
                    icon={<Warning/>}
                />,
                <MOLDataGridHeaderItem
                    label={t('book.invitation.table.row_5')}
                    icon={<Security/>}
                />,
                <MOLDataGridHeaderItem
                    label={t('book.invitation.table.row_6')}
                    icon={<Chat/>}
                />,
                <MOLDataGridHeaderItem
                    label={t('book.invitation.table.row_7')}
                    icon={<Settings/>}
                />
            ]}
            items={props.invitations}
            rowNodes={invitation => [
                <Typography>
                    {formatName(invitation.recipient)}
                </Typography>,

                <Typography>
                    {formatName(invitation.author)}
                </Typography>,

                <Typography
                    fontWeight={'300'}>
                    {t('book.invitation.table.row_3_value', {date: invitation.sentAt.toDate()})}
                </Typography>,

                <Typography
                    fontWeight={'300'}
                >
                    {invitation.expiredAt ? t('book.invitation.table.row_4_value', {date: invitation.expiredAt.toDate()}) : '-'}
                </Typography>,

                <Typography
                    fontWeight={'300'}>
                    {t(localizedRoleName(invitation.role))}
                </Typography>,

                <Typography
                    fontWeight={'300'}
                    style={{
                        display: '-webkit-box',
                        WebkitBoxOrient: 'vertical',
                        WebkitLineClamp: 4,
                        textOverflow: 'ellipsis',
                        overflow: 'hidden'
                    }}
                >
                    {invitation.message ?? '-'}
                </Typography>,

                <IconButton onClick={(e) => props.onInvitationSettingsClick(invitation, e.currentTarget)}>
                    <MoreVert/>
                </IconButton>
            ]}
        />
    )
}

/**
 * Component for the invitations settings menu
 * @param props The props
 */
function InvitationSettingsMenu(
    props: {
        memberRole: MemberRole,
        menuState: ValuedMenuState<Invitation>,
        onRevoke: () => void
    }
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
export default function BookDetailInvitationSection(props: BookDetailInvitationSectionProps) {
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