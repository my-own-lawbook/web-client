import {FormField} from "../../../core/hooks/form/useFormField.ts";
import ErrorState from "../../../core/states/ErrorState.ts";
import {useState} from "react";
import {useForm3} from "../../../core/hooks/form/useForm.ts";
import {validateEmail, validatePassword, validateUsername} from "../../../core/validation/formatValidation.ts";
import {useNavigate} from "react-router-dom";
import {setAccessToken, setRefreshToken} from "../../../core/storage/tokens.ts";
import {asConflictUniqueError} from "../../../core/network/error/errorBody.ts";
import {loginApiCall, requestEmailVerifyTokenApiCall, signupApiCall} from "../../../core/network/authCalls.ts";

/**
 * State of the signup screen
 */
type SignupState = {

    /**
     * The email field
     */
    email: FormField<string>,

    /**
     * The password field
     */
    password: FormField<string>,

    /**
     * The username field
     */
    username: FormField<string>

} & ErrorState

/**
 * Return value of the useSignup
 */
type UseSignup = {

    /**
     * The state
     */
    state: SignupState,

    /**
     * Callback when user presses confirm button
     */
    onConfirm: () => Promise<void>,

    /**
     * Callback when user click login link
     */
    onGoToLogin: () => Promise<void>

}

/**
 * Handler for when the user clicks the confirmation button
 * @param validateAll The method to validate all form fields
 * @param email The email field
 * @param username The username field
 * @param password The password field
 * @param setIsError The callback to set the error
 * @param onSuccess The on success callback
 */
const onConfirm = async (
    validateAll: () => boolean,
    email: FormField<string>,
    username: FormField<string>,
    password: FormField<string>,
    setIsError: (isError: boolean) => void,
    onSuccess: () => Promise<void>
) => {
    if (validateAll()) {
        return
    }

    const signupResult = await signupApiCall(
        email.input.value,
        username.input.value,
        password.input.value
    )

    if (!signupResult.isSuccess) {
        setIsError(true)
        return
    } else if (!signupResult.isHttpSuccess) {
        const errorUnique = asConflictUniqueError(signupResult)
        switch (errorUnique?.info.field) {
            case 'email': {
                email.setError("validation.context.auth.email_taken")
                break;
            }
            case 'username': {
                username.setError("validation.context.auth.username_taken")
            }
        }
        return
    }

    const loginResult = await loginApiCall(email.input.value, password.input.value)
    setIsError(!loginResult.isSuccess || !loginResult.isHttpSuccess)
    if (!loginResult.isSuccess || !loginResult.isHttpSuccess) {
        return
    }

    setAccessToken(loginResult.data!.accessToken)
    setRefreshToken(loginResult.data!.refreshToken)

    const requestTokenResult = await requestEmailVerifyTokenApiCall()
    setIsError(!requestTokenResult.isSuccess || !requestTokenResult.isHttpSuccess)
    if (!requestTokenResult.isSuccess || !requestTokenResult.isHttpSuccess) {
        return
    }

    await onSuccess()
}

/**
 * The hook
 *
 * @param onSuccess The action to do when the user successfully logged in
 */
const useSignup = (
    onSuccess: () => void
): UseSignup => {
    const navigate = useNavigate()

    const [isError, setIsError] = useState(false)

    const {
        field1: email,
        field2: username,
        field3: password,
        validateAll
    } = useForm3(
        {
            initial: "",
            validate: validateEmail
        },
        {
            initial: "",
            validate: validateUsername
        },
        {
            initial: "",
            validate: validatePassword
        },
    )

    const onGoToLogin = async () => {
        navigate("/auth/login", {replace: true})
    }

    return {
        state: {
            email: email,
            username: username,
            password: password,
            isError: isError
        },
        onConfirm: () => {
            return onConfirm(
                validateAll,
                email,
                username,
                password,
                setIsError,
                async () => {
                    setTimeout(onSuccess, 500)
                }
            )
        },
        onGoToLogin: onGoToLogin
    }
}

export default useSignup