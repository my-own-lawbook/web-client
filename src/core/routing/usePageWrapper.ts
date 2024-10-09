import ValuedDialogState, {useDialogState} from "../states/ValuedDialogState.ts";
import User from "../model/User.ts";
import {useNavigate} from "react-router-dom";
import {useAuth} from "../useAuth.ts";

/**
 * Type of the usePageWrapper hook
 */
type UsePageWrapper = {

    /**
     * State of the profile dialog
     */
    profileDialogState: ValuedDialogState<User>

    /**
     * Logs the user out
     */
    logout: () => Promise<void>,

    /**
     * Logs all devices of the user out
     */
    logoutAll: () => Promise<void>

}

/**
 * Hook for the PageWrapper component
 */
const usePageWrapper = (): UsePageWrapper => {
    const navigate = useNavigate()
    const auth = useAuth()

    const profileDialogState = useDialogState<User>()

    return {
        profileDialogState,
        async logout() {
            await auth.logout()
            navigate("/")
        },
        async logoutAll() {
            await auth.logoutAll()
            navigate("/")
        }
    }
}

export default usePageWrapper