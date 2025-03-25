import {useTranslation} from "react-i18next";
import ValuedDialogState from "../../states/ValuedDialogState.ts";
import {Button, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@mui/material";
import BookNameTextField from "../form/BookNameTextField.tsx";
import BookDescriptionTextField from "../form/BookDescriptionTextField.tsx";
import BookKeyTextField from "../form/BookKeyTextField.tsx";
import Book from "../../model/Book.ts";
import useCreateBookDialog from "./useCreateBookDialog.ts";

/**
 * Props for the CreateBookDialogContent component
 */
type CreateBookDialogContentProps = {

    /**
     * The dialog state with the book that should be updated, or null
     */
    dialogState: ValuedDialogState<Book | null>,

    /**
     * Callback to trigger refreshing the books on the screen
     */
    refreshBooks: () => void

}

/**
 * Component for the dialog that prompts the user to create a book
 * @param props The props
 */
export default function CreateBookDialogContent(props: Readonly<CreateBookDialogContentProps>) {
    const {t} = useTranslation()

    const {
        nameField,
        keyField,
        descriptionField,
        onSubmitAction
    } = useCreateBookDialog(props.dialogState.data, props.dialogState, props.refreshBooks)

    return (
        <>
            <DialogTitle>{t('components.dialog.add_book.title')}</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    {t('components.dialog.add_book.description')}
                </DialogContentText>

                <BookNameTextField field={nameField}/>
                <BookKeyTextField field={keyField}/>
                <BookDescriptionTextField field={descriptionField}/>

                <DialogActions>
                    <Button
                        variant={'outlined'}
                        onClick={onSubmitAction}
                    >
                        {t('components.dialog.add_book.confirm_button_label')}
                    </Button>
                </DialogActions>
            </DialogContent>
        </>
    )
}