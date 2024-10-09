import ValuedDialogState from "../../../../core/states/ValuedDialogState.ts";
import Book from "../../../../core/model/Book.ts";
import {Button, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@mui/material";
import {useTranslation} from "react-i18next";
import {EntryNameTextField, ShortEntryNameTextField} from "../../../../core/components/form/EntryNameTextField.tsx";
import useCreateEntryDialog from "./useCreateEntryDialog.ts";
import Entry from "../../../../core/model/Entry.ts";

/**
 * Data type that contains either a book or an entry
 */
export type BookOrEntry = {

    /**
     * The book
     */
    book: Book,

    /**
     * The entry
     */
    entry?: Entry

}

/**
 * Props for the CreateEntryDialogContent component
 */
type CreateEntryDialogContentProps = {

    /**
     * Dialog state with the book the entry will be created in.
     *
     * If the entry is defined, the dialog will update the entry, not create a new one
     */
    dialogState: ValuedDialogState<BookOrEntry>,

    /**
     * Callback to refresh the list of entries
     */
    refreshEntries: () => void

}

/**
 * Component for a dialog that lets a user add an entry to a book
 * @param props The props
 */
export default function CreateEntryDialogContent(props: Readonly<CreateEntryDialogContentProps>) {
    const {t} = useTranslation()

    const {
        nameField,
        keyField,
        onSubmitAction
    } = useCreateEntryDialog(props.dialogState.data!, props.dialogState, props.refreshEntries)

    const isCreate = props.dialogState.data!.entry == undefined
    const keyPrefix = 'book.content.entry_dialog.' + (isCreate ? 'create' : 'update')

    return (
        <>
            <DialogTitle>{t(`${keyPrefix}.title`)}</DialogTitle>
            <DialogContent>
                <DialogContentText>{t(`${keyPrefix}.description`)}</DialogContentText>

                <EntryNameTextField field={nameField}/>
                <ShortEntryNameTextField field={keyField}/>

                <DialogActions>
                    <Button
                        variant={'contained'}
                        onClick={onSubmitAction}
                    >
                        {t(`${keyPrefix}.confirm_button_label`)}
                    </Button>
                </DialogActions>
            </DialogContent>
        </>
    )
}