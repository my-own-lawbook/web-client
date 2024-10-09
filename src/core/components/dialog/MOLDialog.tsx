import ValuedDialogState from "../../states/ValuedDialogState.ts";
import {Dialog, DialogProps, IconButton, styled} from "@mui/material";
import {useEffect, useState} from "react";
import {Close} from "@mui/icons-material";
import './MOLDialog.css'

/**
 * Props for the MOLDialog wrapper
 */
type MOLDialogProps<T> = {

    /**
     * The dialog state to control the dialog
     */
    dialogState: ValuedDialogState<T>

} & Partial<DialogProps>

const StyledDialog = styled(Dialog)(({theme}) => ({
    '& .MuiDialog-paper': {
        borderRadius: theme.spacing(3)
    },
    '& .MuiDialogActions-root': {
        paddingRight: theme.spacing(2),
        paddingBottom: theme.spacing(2)
    }
}))

/**
 * Dialog wrapper that configures the dialog and uses a dialogState
 * @param props The props
 */
export default function MOLDialog<T>(props: MOLDialogProps<T>) {
    const [isVisible, setIsVisible] = useState(false)

    const {dialogState, children, ...dialogProps} = props

    useEffect(() => {
        if (dialogState.isOpen) {
            setIsVisible(true)
        }
    }, [dialogState.isOpen]);

    const onClose = () => {
        dialogState.close()
        setTimeout(() => setIsVisible(false), 500)
    }

    return (
        isVisible ?
            <StyledDialog
                open={dialogState.isOpen}
                onClose={onClose}
                className="mol-dialog"

                {...dialogProps}
            >
                <IconButton
                    className="close-button"
                    onClick={onClose}
                >
                    <Close/>
                </IconButton>
                {children}
            </StyledDialog>
            : null
    )
}