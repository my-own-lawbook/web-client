import ValuedDialogState from "../../../../core/states/ValuedDialogState.ts";
import Book from "../../../../core/model/Book.ts";
import {Box, Button, DialogActions, DialogContent, DialogTitle} from "@mui/material";
import UserSelect from "../../../../core/components/form/UserSelect.tsx";
import {FormField} from "../../../../core/hooks/form/useFormField.ts";
import MemberRoleSelect from "../../../../core/components/form/MemberRoleSelect.tsx";
import {PropsWithChildren} from "react";
import LabeledCheckbox from "../../../../core/components/form/LabeledCheckbox.tsx";
import ExpirationDateInput from "../../../../core/components/form/ExpirationDateInput.tsx";
import InvitationMessageTextField from "../../../../core/components/form/InvitationMessageTextField.tsx";
import './CreateInvitationDialog.css'
import AnimatedVisibility from "../../../../core/components/AnimatedVisibility.tsx";
import useCreateInvitationDialog from "./useCreateInvitationDialog.ts";
import {useTranslation} from "react-i18next";

/**
 * Props for the create invitation dialog
 */
type CreateInvitationDialogContentProps = {

    /**
     * The book the invitation will be for
     */
    book: Book,

    /**
     * The dialog state
     */
    dialogState: ValuedDialogState<void>,

    /**
     * Callback to refresh the invitations
     */
    refreshInvitations: () => void

}

function CheckboxGuardedSection(
    props: {
        label: string,
        field: FormField<boolean>
    } & PropsWithChildren
) {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column'
            }}
        >
            <LabeledCheckbox
                label={props.label}
                value={props.field.input.value}
                onChange={(_e, c) => props.field.set(c)}
            />

            <AnimatedVisibility visible={props.field.input.value}>
                {props.children}
            </AnimatedVisibility>
        </Box>
    )
}

/**
 * Component for the dialog that lets the user create an invitation
 * @param props The props
 */
export default function CreateInvitationDialogContent(props: Readonly<CreateInvitationDialogContentProps>) {
    const {t} = useTranslation()

    const {
        recipient,
        memberRole,
        message,
        expiresAt,
        isAddMessage,
        isAddExpirationDate,
        selectableUsers,
        submit
    } = useCreateInvitationDialog(
        props.book,
        props.refreshInvitations,
        props.dialogState.close
    )

    return (
        <>
            <DialogTitle>Invitation to "{props.book.name}"</DialogTitle>
            <DialogContent>
                {t('book.invitation.dialog.description')}

                <Box className="form-wrapper">
                    <UserSelect selectableUsers={selectableUsers} field={recipient}/>

                    <MemberRoleSelect field={memberRole}/>

                    <CheckboxGuardedSection
                        label={t('book.invitation.dialog.form.checkbox_message_label')}
                        field={isAddMessage}
                    >
                        <InvitationMessageTextField field={message}/>
                    </CheckboxGuardedSection>

                    <CheckboxGuardedSection
                        label={t('book.invitation.dialog.form.checkbox_expiration_label')}
                        field={isAddExpirationDate}
                    >
                        <ExpirationDateInput field={expiresAt}/>
                    </CheckboxGuardedSection>
                </Box>

            </DialogContent>

            <DialogActions>
                <Button
                    variant={'contained'}
                    onClick={submit}
                >
                    Send
                </Button>
            </DialogActions>
        </>
    )
}