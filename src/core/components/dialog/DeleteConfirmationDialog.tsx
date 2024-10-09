import ValuedDialogState from "../../states/ValuedDialogState.ts";
import MOLDialog from "./MOLDialog.tsx";
import {Trans, useTranslation} from "react-i18next";
import {Button, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@mui/material";

/**
 * Props for the DeleteConfirmation dialog
 */
type DeleteConfirmationDialogProps<T> = {

    /**
     * The callback when the deletion is confirmed
     */
    onConfirm: () => void,

    /**
     * The dialog state with the item to be deleted
     */
    dialogState: ValuedDialogState<T>,

    /**
     * Creates a user-readable identifier from the value
     * @param value The value to be deleted
     */
    identifier: (value: T) => string,

    /**
     * The name of the type of the element that is to be deleted.
     */
    elementName: string

}

/**
 * Component for a generic dialog that prompts the user for a confirmation when deleting something
 * @param props The props
 */
export default function DeleteConfirmationDialog<T>(props: Readonly<DeleteConfirmationDialogProps<T>>) {
    const {t} = useTranslation()

    return (
        <MOLDialog
            dialogState={props.dialogState}
        >
            <DialogTitle>{t('components.dialog.delete_confirmation.title', {type: props.elementName})}</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    <Trans
                        i18nKey='components.dialog.delete_confirmation.description'
                        values={{identifier: props.dialogState.data ? props.identifier(props.dialogState.data) : ''}}
                    >
                        _<b>_</b>_
                    </Trans>
                </DialogContentText>
                <DialogActions>
                    <Button
                        variant={'outlined'}
                        color={'error'}
                        onClick={props.onConfirm}
                    >
                        {t('components.dialog.delete_confirmation.confirm_button_label')}
                    </Button>
                </DialogActions>
            </DialogContent>
        </MOLDialog>
    )
}