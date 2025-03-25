import Book from "../../core/model/Book.ts";
import ValuedDialogState from "../../core/states/ValuedDialogState.ts";
import {FormField} from "../../core/hooks/form/useFormField.ts";
import {InputForm3, useForm3} from "../../core/hooks/form/useForm.ts";
import {validateValidName} from "../../core/validation/formatValidation.ts";
import {createBookApiCall, updateBookApiCall} from "../../core/network/lawCalls.ts";
import {asConflictUniqueError} from "../../core/network/error/errorBody.ts";

/**
 * Type of the useCreateBookDialog hook.
 */
type UseCreateBookDialog = {

    /**
     * The form field for the name
     */
    nameField: FormField<string>,

    /**
     * The form field for the key
     */
    keyField: FormField<string>,

    /**
     * The form field for the description
     */
    descriptionField: FormField<string>,

    /**
     * The action to execute when the submit button is clicked
     */
    onSubmitAction: () => Promise<void>

}

/**
 * Validates and submits the form
 * @param form The form object
 * @param bookToUpdate The book to update, or null
 * @return Whether the dialog should be closed
 */
const submit = async (
    form: InputForm3<string, string, string>,
    bookToUpdate: Book | null
): Promise<boolean> => {
    form.clearAllErrors()
    if (form.validateAll()) {
        return false
    }

    const response = bookToUpdate ? await updateBookApiCall(
            bookToUpdate.id,
            form.field2.valueIfDirty(),
            form.field1.valueIfDirty(),
            form.field3.valueIfDirty()
        )
        : await createBookApiCall(
            form.field1.input.value,
            form.field2.input.value,
            form.field3.input.value
        )

    if (
        response.isSuccess &&
        !response.isHttpSuccess &&
        asConflictUniqueError(response)?.info.field == 'key'
    ) {
        form.field2.setError('validation.context.book.key_not_unique')
        return false
    }

    return true
}

/**
 * The useCreateBookDialog hook.
 *
 * @param book The book to update, or null
 * @param dialogState The dialog state
 * @param refreshBooks The callback to refresh the books
 */
const useCreateBookDialog = (
    book: Book | null,
    dialogState: ValuedDialogState<Book | null>,
    refreshBooks: () => void
): UseCreateBookDialog => {
    const form = useForm3(
        {
            initial: "",
            validate: validateValidName
        },
        {
            initial: "",
            validate: validateValidName
        },
        {
            initial: "",
            validate: () => null
        }
    )

    return {
        nameField: form.field1,
        keyField: form.field2,
        descriptionField: form.field3,
        async onSubmitAction(): Promise<void> {
            const isClose = await submit(form, book)
            if (isClose) {
                dialogState.close()
                refreshBooks()
            }
        }
    }
}

export default useCreateBookDialog