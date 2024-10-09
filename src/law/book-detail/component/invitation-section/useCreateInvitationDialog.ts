import {FormField} from "../../../../core/hooks/form/useFormField.ts";
import ForeignUser from "../../../../core/model/ForeignUser.ts";
import {MemberRole} from "../../../../core/model/MemberRole.ts";
import {Dayjs} from "dayjs";
import Book from "../../../../core/model/Book.ts";
import useApiCallPending from "../../../../core/hooks/useApiCallPending.ts";
import {fetchAllForeignUsers, fetchMembersOfBook} from "../../../../core/network/userCalls.ts";
import {useForm6} from "../../../../core/hooks/form/useForm.ts";
import {validateInFuture, validateNotBlank, validateNotNull} from "../../../../core/validation/formatValidation.ts";
import {createInvitationApiCall} from "../../../../core/network/invitationCalls.ts";
import {useTranslation} from "react-i18next";

/**
 * Return type of the userInvitationDialog hook
 */
type UseCreateInvitationDialog = {

    /**
     * The selected user
     */
    recipient: FormField<ForeignUser | null>,

    /**
     * The selected member role
     */
    memberRole: FormField<MemberRole>,

    /**
     * The message
     */
    message: FormField<string>,

    /**
     * The expiration date
     */
    expiresAt: FormField<Dayjs | null>,

    /**
     * Whether the user selected to add a message
     */
    isAddMessage: FormField<boolean>,

    /**
     * Whether the user selected to create an expiration date
     */
    isAddExpirationDate: FormField<boolean>,

    /**
     * The users that can be selected
     */
    selectableUsers: ForeignUser[] | null,

    /**
     * Submits the form
     */
    submit: () => Promise<void>

}

/**
 * Hook to control the CreateInvitationDialog
 * @param book The book the invitation will be for
 * @param refreshInvitations Callback to refresh the invitations
 * @param closeDialog Callback to close the dialog
 */
const useCreateInvitationDialog = (
    book: Book,
    refreshInvitations: () => void,
    closeDialog: () => void
): UseCreateInvitationDialog => {
    const {t} = useTranslation()

    const {
        field1: isAddMessage,
        field2: isAddExpiration,
        field3: user,
        field4: memberRoleField,
        field5: messageField,
        field6: expiresAtField,
        validateAll,
        clearAllErrors
    } = useForm6<boolean, boolean, ForeignUser | null, MemberRole, string, Dayjs | null>(
        {
            initial: false,
            validate: () => null
        },
        {
            initial: false,
            validate: () => null
        },
        {
            initial: null,
            validate: u => validateNotNull(u, 'validation.format.non_empty.user')
        },
        {
            initial: MemberRole.Member,
            validate: () => null
        },
        {
            initial: "",
            validate: () => null
        },
        {
            initial: null,
            validate: () => null
        }
    )

    const membersInBook = useApiCallPending(() => fetchMembersOfBook(book.id))
    const allUsers = useApiCallPending(() => fetchAllForeignUsers())

    const selectableUsers = membersInBook.isFinishedSuccess && allUsers.isFinishedSuccess ?
        allUsers.data!.filter(user => membersInBook.data!.filter(memberInBook => memberInBook.id == user.id).length == 0) :
        null

    const submitAction = async () => {
        clearAllErrors()
        if (validateAll()) {
            return
        }

        let isError = false
        if (isAddMessage.input.value) {
            const error = validateNotBlank(messageField.input.value)
            messageField.setError(error ? t(error) : null)
            isError = isError || !!error
        }
        if (isAddExpiration.input.value) {
            const error = validateInFuture(expiresAtField.input.value)
            expiresAtField.setError(error ? t(error) : null)
            isError = isError || !!error
        }

        if (isError) {
            return
        }

        const response = await createInvitationApiCall(
            book.id,
            user.input.value!.id,
            memberRoleField.input.value,
            isAddExpiration.input.value ? expiresAtField.input.value! : null,
            isAddMessage.input.value ? messageField.input.value! : null
        )
        if (response.httpStatus == 409) {
            user.setError("validation.context.user.invitation_present")
        } else {
            refreshInvitations()
            closeDialog()
        }
    }

    return {
        recipient: user,
        memberRole: memberRoleField,
        message: messageField,
        expiresAt: expiresAtField,
        isAddMessage: isAddMessage,
        isAddExpirationDate: isAddExpiration,
        selectableUsers: selectableUsers,
        submit: submitAction
    }
}

export default useCreateInvitationDialog