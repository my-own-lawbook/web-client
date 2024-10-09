import {FormField} from "../../../core/hooks/form/useFormField.ts";
import {Dayjs} from "dayjs";
import Gender from "../../../core/model/Gender.ts";
import ErrorState from "../../../core/states/ErrorState.ts";
import {useForm4} from "../../../core/hooks/form/useForm.ts";
import {validateInPast, validateNotNull, validateProfileName} from "../../../core/validation/formatValidation.ts";
import {useState} from "react";
import setUserProfile from "../../../core/network/userCalls.ts";

/**
 * The state of the profile screen
 */
type ProfileState = {

    /**
     * The first name field
     */
    firstName: FormField<string>,

    /**
     * The last name field
     */
    lastName: FormField<string>,

    /**
     * The birthday field
     */
    birthday: FormField<Dayjs | null>,

    /**
     * The gender field
     */
    gender: FormField<Gender | null>,

} & ErrorState

/**
 * The hook type
 */
type UseSetProfile = {

    /**
     * The state
     */
    state: ProfileState,

    /**
     * The on submit callback
     */
    onSubmit: () => Promise<void>

}

/**
 * The handler when the user clicks the save button
 * @param firstName The first name field
 * @param lastName The last name field
 * @param birthday The birthday field
 * @param gender The gender field
 * @param validateAll The method to validate all
 * @param setIsError The method to set is error
 * @param onSuccess The callback for on success
 */
const onSave = async (
    firstName: FormField<string>,
    lastName: FormField<string>,
    birthday: FormField<Dayjs | null>,
    gender: FormField<Gender | null>,
    validateAll: () => boolean,
    setIsError: (isError: boolean) => void,
    onSuccess: () => void
): Promise<void> => {
    if (validateAll()) {
        return
    }

    const profileResponse = await setUserProfile(
        firstName.input.value,
        lastName.input.value,
        birthday.input.value!.toDate().toISOString().split("T")[0],
        gender.input.value!.valueOf()
    )

    if (!profileResponse.isSuccess) {
        setIsError(true)
        return
    } else {
        setIsError(false)
    }

    onSuccess()
}

/**
 * The hook function
 * @param onSuccess The callback when the profile is set successfully
 */
const useSetProfile = (onSuccess: () => void): UseSetProfile => {
    const [isError, setIsError] = useState(false)

    const {
        field1: firstName,
        field2: lastName,
        field3: birthday,
        field4: gender,
        validateAll
    } = useForm4<string, string, Dayjs | null, Gender | null>(
        {
            initial: "",
            validate: validateProfileName
        },
        {
            initial: "",
            validate: validateProfileName
        },
        {
            initial: null,
            validate: validateInPast
        },
        {
            initial: null,
            validate: (v) => validateNotNull(v, "validation.format.non_empty.gender")
        }
    )

    return {
        state: {
            firstName: firstName,
            lastName: lastName,
            birthday: birthday,
            gender: gender,
            isError: isError
        },
        async onSubmit() {
            return await onSave(firstName, lastName, birthday, gender, validateAll, setIsError, onSuccess)
        }
    }
}

export default useSetProfile