import {FormField} from "../../../core/hooks/form/useFormField.ts";
import ErrorState from "../../../core/states/ErrorState.ts";
import {useEffect, useState} from "react";
import {useForm1} from "../../../core/hooks/form/useForm.ts";
import SuccessState from "../../../core/states/SuccessState.ts";
import {useNavigate, useSearchParams} from "react-router-dom";
import {requestEmailVerifyTokenApiCall, submitEmailVerifyTokenApiCall} from "../../../core/network/authCalls.ts";

/**
 * State of the email verify screen
 */
type EmailVerifyState = {

    /**
     * The entered token
     */
    token: FormField<string>,

    /**
     * Whether the user can click the request new email button
     */
    canRequestEmail: boolean

} & ErrorState & SuccessState

/**
 * The return type of the hook
 */
type UseEmailVerify = {

    /**
     * The state
     */
    state: EmailVerifyState,

    /**
     * Callback for when the user clicks the confirm button
     */
    onConfirm: () => Promise<void>,

    /**
     * Callback for when the user clicks the confirm button
     */
    onRequestNewEmail: () => Promise<void>

}

/**
 * Handler for when the user clicks on the request email button
 * @param setIsError The callback to change the is error state
 * @param setCanRequestEmail The callback to change the can request email state
 */
const onRequestEmail = async (
    setIsError: (isError: boolean) => void,
    setCanRequestEmail: (canRequest: boolean) => void,
) => {
    const requestResult = await requestEmailVerifyTokenApiCall()

    setIsError(!requestResult.isSuccess)
    if (requestResult.isSuccess) {
        setCanRequestEmail(false)
        setTimeout(() => {
            setCanRequestEmail(true)
        }, 5000)
    }
}

/**
 * Handler for when the user clicks on the submit button
 * @param token The token field
 * @param setIsError The callback to change the is error state
 * @param setIsSuccess The callback to change the is success state
 * @param onSuccess The on success callback
 */
const onSubmit = async (
    token: FormField<string>,
    setIsError: (isError: boolean) => void,
    setIsSuccess: (isError: boolean) => void,
    onSuccess: () => void
) => {
    token.clearError()

    const result = await submitEmailVerifyTokenApiCall(token.input.value)

    setIsError(!result.isSuccess)
    if (!result.isSuccess)
        return

    if (!result.isHttpSuccess) {
        token.setError("validation.context.auth.invalid_token")
        return
    }

    setIsSuccess(true)

    setTimeout(onSuccess, 5000)
}

/**
 * The hook
 * @param onSuccess The on success callback
 */
const useEmailVerify = (
    onSuccess: () => void
): UseEmailVerify => {
    const [params] = useSearchParams()
    const navigate = useNavigate()

    const [isError, setIsError] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)
    const [canRequestEmail, setCanRequestEmail] = useState(true)

    const {
        field1: token
    } = useForm1(
        {
            initial: "",
            validate: () => null
        }
    )

    useEffect(() => {
        if (params.has("token")) {
            token.set(params.get("token") ?? "")
        }
    }, [navigate, params, token])

    return {
        state: {
            token: token,
            canRequestEmail: canRequestEmail,
            isError: isError,
            isSuccess: isSuccess
        },
        onConfirm: () => {
            return onSubmit(token, setIsError, setIsSuccess, onSuccess)
        },
        onRequestNewEmail: () => {
            return onRequestEmail(setIsError, setCanRequestEmail)
        }
    }
}

export default useEmailVerify