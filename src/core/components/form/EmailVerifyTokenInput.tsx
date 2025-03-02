import {TextField} from "@mui/material";
import CivorisTextFieldProps from "./base/CivorisTextFieldProps.ts";
import {useTranslation} from "react-i18next";

/**
 * Component that preconfigures a text input for the email token
 */
export default function EmailVerifyTokenInput(props: CivorisTextFieldProps) {
    const {t} = useTranslation()

    return (
        <TextField
            {...props}
            id="email-token"
            name="email-token"
            type="text"

            label={t('components.input.email_token.label')}
            placeholder={t('components.input.email_token.placeholder')}

            sx={{mt: '4px'}}

            value={props.field.input.value}
            onChange={(e) => props.field.set(e.target.value)}
            variant="outlined"

            helperText={props.field.input.error ? t(props.field.input.error) : null}
            error={props.field.input.error != null}
        />
    )
}