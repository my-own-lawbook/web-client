import {FormField} from "../../../core/hooks/form/useFormField.ts";
import {useForm2} from "../../../core/hooks/form/useForm.ts";
import {useState} from "react";
import {setAccessToken, setRefreshToken} from "../../../core/storage/tokens.ts";
import {loginApiCall} from "../../../core/network/authCalls.ts";

/**
 * State for the login screen
 */
type LoginState = {

    /**
     * The email field
     */
    email: FormField<string>,

    /**
     * The password field
     */
    password: FormField<string>,

    /**
     * Whether an error occurred
     */
    isError: boolean

}

/**
 * The type of the hook
 */
type UseLogin = {

    /**
     * The login state
     */
    state: LoginState,

    /**
     * The callback for the submit action
     */
    onSubmit: () => Promise<void>

}

/**
 * Action when the user clicks on the submit button
 * @param email The email field
 * @param password The password field
 * @param clearAll Clears all errors
 * @param setIsError Sets whether an error occurred
 * @param onSuccess Callback when login finished
 */
const onSubmit = async (
    email: FormField<string>,
    password: FormField<string>,
    clearAll: () => void,
    setIsError: (isError: boolean) => void,
    onSuccess: () => void
) => {
    clearAll()

    const result = await loginApiCall(email.input.value, password.input.value)

    setIsError(!result.isSuccess)
    if (!result.isSuccess) {
        // Do nothing
    } else if (!result.isHttpSuccess) {
        email.setError("validation.context.auth.bad_credentials")
        password.setError("validation.context.auth.bad_credentials")
    } else {
        setAccessToken(result.data!.accessToken)
        setRefreshToken(result.data!.refreshToken)
        onSuccess()
    }
}

/**
 * The hook function
 * @param onSuccess The on success callback
 */
const useLogin = (onSuccess: () => void): UseLogin => {
    const [isError, setIsError] = useState(false)

    const {
        field1: email,
        field2: password,
        clearAllErrors
    } = useForm2(
        {
            initial: "",
            validate: () => null
        },
        {
            initial: "",
            validate: () => null
        },
    )

    return {
        state: {
            email: email,
            password: password,
            isError: isError
        },
        async onSubmit() {
            return await onSubmit(email, password, clearAllErrors, setIsError, onSuccess)
        }
    }
}

export default useLogin