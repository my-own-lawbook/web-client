import {TextField} from "@mui/material";
import MOLTextFieldProps from "./base/MOLTextFieldProps.ts";
import {useTranslation} from "react-i18next";

/**
 * Component that preconfigures a text input for the email input type
 */
export default function EmailTextField(props: MOLTextFieldProps) {
    const {t} = useTranslation()

    return (
        <TextField
            {...props}
            id="email"
            type="email"

            label={t('components.input.email.label')}
            placeholder={t('components.input.email.placeholder')}

            sx={{mt: '4px'}}

            value={props.field.input.value}
            onChange={(e) => props.field.set(e.target.value)}
            variant="outlined"

            helperText={props.field.input.error ? t(props.field.input.error) : null}
            error={props.field.input.error != null}
        />
    )
}