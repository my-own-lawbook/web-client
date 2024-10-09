import {TextField} from "@mui/material";
import MOLTextFieldProps from "./base/MOLTextFieldProps.ts";
import {useTranslation} from "react-i18next";

/**
 * Component that preconfigures a text input for the email token
 */
export default function InvitationMessageTextField(props: MOLTextFieldProps) {
    const {t} = useTranslation()

    return (
        <TextField
            {...props}
            id="invitation-message"
            name="invitation-message"
            type="text"
            multiline

            label={t('components.input.invitation_message.label')}
            placeholder={t('components.input.invitation_message.placeholder')}

            sx={{mt: '4px', width: '100%'}}


            value={props.field.input.value}
            onChange={(e) => props.field.set(e.target.value)}
            variant="outlined"

            helperText={props.field.input.error ? t(props.field.input.error) : null}
            error={props.field.input.error != null}
        />
    )
}