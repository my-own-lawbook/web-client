import {FormField} from "../../../../core/hooks/form/useFormField.ts";
import {InputForm2, useForm2} from "../../../../core/hooks/form/useForm.ts";
import {createEntryApiCall, updateEntryApiCall} from "../../../../core/network/lawCalls.ts";
import {asConflictUniqueError} from "../../../../core/network/error/errorBody.ts";
import ValuedDialogState from "../../../../core/states/ValuedDialogState.ts";
import {BookOrEntry} from "./CreateEntryDialogContent.tsx";
import {validateNotBlank} from "../../../../core/validation/formatValidation.ts";

/**
 * Type of the useCreateEntryDialog hook
 */
type UseCreateEntryDialog = {

    /**
     * The name form field
     */
    nameField: FormField<string>,

    /**
     * The short name form field
     */
    keyField: FormField<string>,

    /**
     * Handler for the submit action
     */
    onSubmitAction: () => Promise<void>

}

/**
 * Validates and submits the form
 * @param form The form object
 * @param bookWithEntry The book with the optional entry
 * @return Whether the dialog should be closed
 */
const submit = async (
    form: InputForm2<string, string>,
    bookWithEntry: BookOrEntry
): Promise<boolean> => {
    form.clearAllErrors()
    if (form.validateAll()) {
        return false
    }

    const response = bookWithEntry.entry ? await updateEntryApiCall(
            bookWithEntry.entry.id,
            form.field1.valueIfDirty(),
            form.field2.valueIfDirty()
        )
        : await createEntryApiCall(
            form.field2.input.value,
            form.field1.input.value,
            bookWithEntry.book.id
        )

    if (
        response.isSuccess &&
        !response.isHttpSuccess &&
        asConflictUniqueError(response)?.info.field == 'key'
    ) {
        form.field1.setError('validation.context.entry.key_not_unique')
        return false
    }

    return true
}

/**
 * Hook for the CreateEntryDialog component
 * @param bookWithEntry The book
 * @param dialogState The dialog state
 * @param refreshEntries Callback to refresh the entries list
 @param entry The entry to update, or undefined if an entry should be added
 */
const useCreateEntryDialog = (
    bookWithEntry: BookOrEntry,
    dialogState: ValuedDialogState<BookOrEntry>,
    refreshEntries: () => void
): UseCreateEntryDialog => {
    const form = useForm2(
        {
            initial: bookWithEntry.entry?.key ?? '',
            validate: validateNotBlank
        },
        {
            initial: bookWithEntry.entry?.name ?? '',
            validate: validateNotBlank
        }
    )

    return {
        keyField: form.field1,
        nameField: form.field2,
        async onSubmitAction(): Promise<void> {
            const isClose = await submit(form, bookWithEntry)
            if (isClose) {
                dialogState.close()
                refreshEntries()
            }
        }
    }
}

export default useCreateEntryDialog
