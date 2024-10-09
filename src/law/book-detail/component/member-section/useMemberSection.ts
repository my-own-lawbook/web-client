import BookMember from "../../../../core/model/BookMember.ts";
import {MemberRole} from "../../../../core/model/MemberRole.ts";
import ValuedMenuState, {useMenuState} from "../../../../core/states/ValuedMenuState.ts";
import ValuedDialogState, {useDialogState} from "../../../../core/states/ValuedDialogState.ts";

/**
 * Type of the hook
 */
type UseMemberSection = {

    /**
     * Whether one user with admin privileges can be downgraded
     */
    canRemoveOneAdmin: boolean,

    /**
     * State of the member settings menu
     */
    memberSettingsMenuState: ValuedMenuState<BookMember>,

    /**
     * State of the update role dialog
     */
    updateRoleDialogState: ValuedDialogState<BookMember>,

    /**
     * State of the remove member dialog
     */
    removeMemberDialogState: ValuedDialogState<BookMember>,

    /**
     * Opens the remove dialog
     */
    openRemoveDialog: () => void,

    /**
     * Opens the update role dialog
     */
    openUpdateRoleDialog: () => void,

    /**
     * Removes the user attached to the dialog
     */
    removeUser: () => void,

    /**
     * Updates the role of the user attached to the dialog
     */
    updateRole: () => void

}

/**
 * Hook for the member section of the book detail screen
 * @param members The members of the book
 * @param memberRole The member role of the current user
 * @param onChangeRole Callback to change a members role
 * @param onRemoveMember Callback to remove a member
 */
const useMemberSection = (
    members: BookMember[],
    memberRole: MemberRole,
    onChangeRole: (userId: number, role: MemberRole) => void,
    onRemoveMember: (id: number) => void
): UseMemberSection => {
    const memberSettingsMenuState = useMenuState<BookMember>()

    const removeMemberDialogState = useDialogState<BookMember>(false)
    const updateRoleDialogState = useDialogState<BookMember>(false)

    return {
        canRemoveOneAdmin: members.filter(m => m.memberRole == MemberRole.Admin).length > 1,
        memberSettingsMenuState,
        updateRoleDialogState,
        removeMemberDialogState,
        openRemoveDialog() {
            removeMemberDialogState.open(memberSettingsMenuState.data!)
            memberSettingsMenuState.close()
        },
        openUpdateRoleDialog() {
            updateRoleDialogState.open(memberSettingsMenuState.data!)
            memberSettingsMenuState.close()
        },
        removeUser() {
            const userId = removeMemberDialogState.data!.id
            removeMemberDialogState.close()
            onRemoveMember(userId)
        },
        updateRole() {
            const memberId = updateRoleDialogState.data!.id
            updateRoleDialogState.close()
            onChangeRole(memberId, memberRole)
        }
    }
}

export default useMemberSection