import {TextField} from "@mui/material";
import CivorisTextFieldProps from "./base/CivorisTextFieldProps.ts";
import {useTranslation} from "react-i18next";

/**
 * Component that preconfigures a text input for the username input type
 */
export default function UsernameFormInput(props: CivorisTextFieldProps) {
    const {t} = useTranslation()

    return (
        <TextField
            {...props}
            id="username"
            name="username"
            type="text"
            sx={{mt: '4px'}}

            label={t('components.input.username.label')}
            placeholder={t('components.input.username.placeholder')}

            onChange={(e) => props.field.set(e.target.value)}
            variant="outlined"

            helperText={props.field.input.error ? t(props.field.input.error) : null}
            error={props.field.input.error != null}
        />
    )
}