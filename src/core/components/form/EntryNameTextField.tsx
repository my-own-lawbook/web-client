import {TextField} from "@mui/material";
import MOLTextFieldProps from "./base/MOLTextFieldProps.ts";
import {useTranslation} from "react-i18next";

/**
 * Component that preconfigures a text input for the entry name input type
 */
export function EntryNameTextField(props: MOLTextFieldProps) {
    const {t} = useTranslation()

    return (
        <TextField
            {...props}
            id="entry-name"
            type="text"

            label={t('components.input.entry_name.label')}
            placeholder={t('components.input.entry_name.placeholder')}

            sx={{mt: '18px', width: '100%'}}

            value={props.field.input.value}
            onChange={(e) => props.field.set(e.target.value)}
            variant="outlined"

            helperText={props.field.input.error ? t(props.field.input.error) : null}
            error={props.field.input.error != null}
        />
    )
}

/**
 * Component that preconfigures a text input for the short entry name input type
 */
export function ShortEntryNameTextField(props: MOLTextFieldProps) {
    const {t} = useTranslation()

    return (
        <TextField
            {...props}
            id="entry-name"
            type="text"

            label={t('components.input.entry_key.label')}
            placeholder={t('components.input.entry_key.placeholder')}

            sx={{mt: '18px', width: '100%'}}

            value={props.field.input.value}
            onChange={(e) => props.field.set(e.target.value)}
            variant="outlined"

            helperText={props.field.input.error ? t(props.field.input.error) : null}
            error={props.field.input.error != null}
        />
    )
}