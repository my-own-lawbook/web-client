import {FormField} from "../../../../core/hooks/form/useFormField.ts";
import {InputForm3, useForm3} from "../../../../core/hooks/form/useForm.ts";
import {EntryOrSection} from "./CreateSectionDialogContent.tsx";
import {createSectionApiCall, updateSectionApiCall} from "../../../../core/network/lawCalls.ts";
import {asConflictUniqueError} from "../../../../core/network/error/errorBody.ts";
import ValuedDialogState from "../../../../core/states/ValuedDialogState.ts";
import {validateNotBlank} from "../../../../core/validation/formatValidation.ts";

/**
 * Type of the useCreateSectionDialogContent hook
 */
type UseCreateSectionDialogContent = {

    /**
     * Form field of the index
     */
    indexField: FormField<string>,

    /**
     * Form field of the name
     */
    nameField: FormField<string>,

    /**
     * Form field of the content
     */
    contentField: FormField<string>,

    /**
     * The callback for when the form is submitted
     */
    onSubmit: () => Promise<void>

}

/**
 * Handles the submitting of the form
 * @param entryWithSection The entry with the to be edited section
 * @param form The form
 * @return Whether the dialog should be closed
 */
const submit = async (
    entryWithSection: EntryOrSection,
    form: InputForm3<string, string, string>
): Promise<boolean> => {
    form.clearAllErrors()

    if (form.validateAll()) {
        return false
    }

    const result = entryWithSection.section ?
        await updateSectionApiCall(
            entryWithSection.section.id,
            form.field1.valueIfDirty(),
            form.field2.valueIfDirty(),
            form.field3.valueIfDirty()
        ) :
        await createSectionApiCall(
            entryWithSection.entry!.id,
            form.field1.input.value,
            form.field2.input.value,
            form.field3.input.value
        )

    if (
        result.isSuccess &&
        !result.isHttpSuccess &&
        asConflictUniqueError(result)?.info.field == 'index'
    ) {
        form.field1.setError('validation.context.section.index_not_unique')
        return false
    }

    return true
}

/**
 * Hook to control the UseCreateSectionDialogComponent
 * @param entryWithSection The entry with the section
 * @param dialogState The dialog state
 * @param refreshSections Refresh the sections
 */
const useCreateSectionDialogContent = (
    entryWithSection: EntryOrSection,
    dialogState: ValuedDialogState<EntryOrSection>,
    refreshSections: () => void
): UseCreateSectionDialogContent => {
    const form = useForm3(
        {
            initial: entryWithSection.section?.index ?? '',
            validate: validateNotBlank
        },
        {
            initial: entryWithSection.section?.name ?? '',
            validate: validateNotBlank
        },
        {
            initial: entryWithSection.section?.content ?? '',
            validate: validateNotBlank
        }
    )

    return {
        indexField: form.field1,
        nameField: form.field2,
        contentField: form.field3,
        async onSubmit() {
            const isClose = await submit(entryWithSection, form)
            if (isClose) {
                refreshSections()
                dialogState.close()
            }
        }
    }
}

export default useCreateSectionDialogContent