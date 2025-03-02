import {TextField} from "@mui/material";
import CivorisTextFieldProps from "./base/CivorisTextFieldProps.ts";
import {useTranslation} from "react-i18next";

/**
 * Text input field for the first name input
 */
export function FirstNameInput(props: CivorisTextFieldProps) {
    const {t} = useTranslation()

    return (
        <TextField
            {...props}
            id="first_name"
            name="first_name"
            type="text"

            label={t('components.input.first_name.label')}
            placeholder={t('components.input.first_name.placeholder')}

            sx={{mt: '4px'}}


            value={props.field.input.value}
            onChange={(e) => props.field.set(e.target.value)}
            variant="outlined"

            helperText={props.field.input.error ? t(props.field.input.error) : null}
            error={props.field.input.error != null}
        />
    )
}

/**
 * Text input field for the last name input
 */
export function LastNameInput(props: CivorisTextFieldProps) {
    const {t} = useTranslation()

    return (
        <TextField
            {...props}
            id="last_name"
            name="last_name"
            type="text"

            label={t('components.input.first_name.label')}
            placeholder={t('components.input.first_name.placeholder')}

            value={props.field.input.value}
            onChange={(e) => props.field.set(e.target.value)}
            variant="outlined"

            helperText={props.field.input.error ? t(props.field.input.error) : null}
            error={props.field.input.error != null}
        />
    )
}