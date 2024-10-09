import ValuedMenuState, {useMenuState} from "../../../../core/states/ValuedMenuState.ts";
import Invitation from "../../../../core/model/Invitation.ts";
import ValuedDialogState, {useDialogState} from "../../../../core/states/ValuedDialogState.ts";

/**
 * Type of the hook
 */
type UseBookDetailInvitationSection = {

    /**
     * The state of the invitation settings menu
     */
    invitationSettingsMenuState: ValuedMenuState<Invitation>,

    /**
     * State of the create invitation dialog
     */
    createInvitationDialogState: ValuedDialogState<void>

}

/**
 * Hook for the invitation section
 */
const useBookDetailInvitationSection = (): UseBookDetailInvitationSection => {
    const invitationSettingsMenuState = useMenuState<Invitation>()
    const createInvitationDialogState = useDialogState<void>()

    return {
        invitationSettingsMenuState,
        createInvitationDialogState
    }
}

export default useBookDetailInvitationSection