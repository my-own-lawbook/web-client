import BookMember from "../../../../core/model/BookMember.ts";
import {localizedRoleName, MemberRole} from "../../../../core/model/MemberRole.ts";
import {
    Box,
    Button,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    IconButton,
    Menu,
    MenuItem,
    Typography
} from "@mui/material";
import './BookDetailMemberSection.css'
import {MoreVert, Person, Security, Settings, TextFields} from "@mui/icons-material";
import {formatName} from "../../../../core/formatting/stringFormatting.ts";
import ValuedDialogState from "../../../../core/states/ValuedDialogState.ts";
import {useForm1} from "../../../../core/hooks/form/useForm.ts";
import MemberRoleSelect from "../../../../core/components/form/MemberRoleSelect.tsx";
import ValuedMenuState from "../../../../core/states/ValuedMenuState.ts";
import useMemberSection from "./useMemberSection.ts";
import MOLDataGrid, {MOLDataGridHeaderItem} from "../../../../core/components/MOLDataGrid.tsx";
import MOLDialog from "../../../../core/components/dialog/MOLDialog.tsx";
import {Trans, useTranslation} from "react-i18next";

/**
 * Props for the BookDetailMemberSection
 */
type BookDetailMemberSectionProps = {

    /**
     * The members of the book
     */
    members: BookMember[],

    /**
     * The member role of the user
     */
    memberRole: MemberRole,

    /**
     * Callback for when the role of a member is changed
     * @param userId The id of the user
     * @param role The new role
     */
    onChangeRole: (userId: number, role: MemberRole) => void,

    /**
     * Callback for when a member is removed from the book
     * @param id The id of the user
     */
    onRemoveMember: (id: number) => void

}

/**
 * Component for the member settings menu
 * @param props The props
 */
function MemberSettingMenu(
    props: Readonly<{
        memberRole: MemberRole,
        menuState: ValuedMenuState<BookMember>,
        onRemove: () => void,
        onChangeRole: () => void
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
                onClick={props.onChangeRole}
            >
                {t('book.member.settings.update_role_label')}
            </MenuItem>

            <MenuItem
                disabled={props.memberRole != MemberRole.Admin.valueOf()}
                onClick={props.onRemove}
            >
                {t('book.member.settings.remove_label')}
            </MenuItem>
        </Menu>
    )
}

/**
 * Component for the confirmation dialog about removing a user
 * @param props The props
 */
function RemoveMemberDialog(
    props: Readonly<{
        dialogState: ValuedDialogState<BookMember>,
        onRemove: () => void
    }>
) {
    const {t} = useTranslation()

    return (
        <MOLDialog
            dialogState={props.dialogState}
        >
            <DialogTitle>{t('book.member.dialog.remove.title')}</DialogTitle>
            <DialogContent>
                {props.dialogState.data ?
                    <DialogContentText>
                        <Trans
                            i18nKey={'book.member.dialog.remove.description'}
                            values={{user: props.dialogState.data.username}}
                        >
                            _<b>_</b>_
                        </Trans>
                    </DialogContentText>
                    : null}
            </DialogContent>
            <DialogActions>
                <Button onClick={props.onRemove}>{t('book.member.dialog.remove.confirm_button_label')}</Button>
            </DialogActions>
        </MOLDialog>
    )
}

/**
 * Component that wraps and configures a MOLDataGrid to display the members
 * @param props The props
 */
function MemberGrid(
    props: Readonly<{
        members: BookMember[],
        onMemberSettingsClick: (member: BookMember, anchor: HTMLElement) => void
    }>
) {
    const {t} = useTranslation()

    const headerItemsData = [
        {label: 'book.member.table.column_1', icon: <Person/>},
        {label: 'book.member.table.column_2', icon: <TextFields/>},
        {label: 'book.member.table.column_3', icon: <Security/>},
        {label: 'book.member.table.column_4', icon: <Settings/>}
    ]

    return (
        <MOLDataGrid
            headerNodes={headerItemsData.map(header => {
                    return {
                        node: <MOLDataGridHeaderItem
                            label={t(header.label)}
                            icon={header.icon}
                            key={header.label}
                        />, id: header.label
                    }
                }
            )}
            items={props.members}
            rowNodes={member => [
                {
                    node: <Typography key={1}>
                    {formatName(member)}
                    </Typography>, fieldName: 'name'
                },

                {
                    node: <Typography
                    fontWeight={'300'}
                    key={2}
                >
                    {member.username}
                    </Typography>, fieldName: 'username'
                },

                {
                    node: <Typography
                    fontWeight={'300'}
                    key={3}
                >
                    {t(localizedRoleName(member.memberRole))}
                    </Typography>, fieldName: 'memberRole'
                },

                {
                    node: <IconButton
                    onClick={e => props.onMemberSettingsClick(member, e.currentTarget)}
                    key={4}
                >
                    <MoreVert/>
                    </IconButton>, fieldName: 'icon-button'
                }
            ]}
        />
    )
}

/**
 * Component for the dialog to choose a member role
 * @param props The props
 */
function ChooseMemberRoleDialogContent(
    props: Readonly<{
        dialogState: ValuedDialogState<BookMember>,
        canDowngradeFromAdmin: boolean,
        onSelect: (role: MemberRole) => void
    }>
) {
    const {t} = useTranslation()

    const {field1: role, validateAll} = useForm1<MemberRole>(
        {
            initial: props.dialogState.data?.memberRole ?? MemberRole.Member,
            validate(role: MemberRole): string | null {
                if (role != MemberRole.Admin && props.dialogState.data!.memberRole == MemberRole.Admin && !props.canDowngradeFromAdmin)
                    return "validation.context.members.only_one_admin"
                else return null
            }
        }
    )

    const onSelectAction = () => {
        if (validateAll())
            return

        props.onSelect(role.input.value)
    }

    return (
        <>
            <DialogTitle>{t('book.member.dialog.role.title')}</DialogTitle>
            <DialogContent>
                {props.dialogState.data ?
                    <Trans i18nKey={"book.member.dialog.role.description"}>
                        _
                        <br/>
                        _
                    </Trans>
                    : null}

                <MemberRoleSelect field={role}/>
            </DialogContent>
            <DialogActions>
                <Button onClick={onSelectAction}>{t('book.member.dialog.role.confirm_button_label')}</Button>
            </DialogActions>
        </>
    )
}

/**
 * Component for the section that displays the members of a book
 * @param props The props
 */
export default function BookDetailMemberSection(props: Readonly<BookDetailMemberSectionProps>) {
    const {
        canRemoveOneAdmin,
        memberSettingsMenuState,
        updateRoleDialogState,
        removeMemberDialogState,
        openRemoveDialog,
        openUpdateRoleDialog,
        removeUser,
        updateRole
    } = useMemberSection(props.members, props.memberRole, props.onChangeRole, props.onRemoveMember)

    return (
        <Box className="member-section">
            <MemberGrid
                members={props.members}
                onMemberSettingsClick={memberSettingsMenuState.open}
            />

            <MemberSettingMenu
                memberRole={props.memberRole}
                menuState={memberSettingsMenuState}
                onRemove={openRemoveDialog}
                onChangeRole={openUpdateRoleDialog}
            />
            <MOLDialog dialogState={updateRoleDialogState}>
                <ChooseMemberRoleDialogContent
                    dialogState={updateRoleDialogState}
                    canDowngradeFromAdmin={canRemoveOneAdmin}
                    onSelect={updateRole}
                />
            </MOLDialog>
            <RemoveMemberDialog
                dialogState={removeMemberDialogState}
                onRemove={removeUser}
            />
        </Box>
    )
}