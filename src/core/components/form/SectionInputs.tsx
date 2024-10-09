import {InputAdornment, TextField} from "@mui/material";
import MOLTextFieldProps from "./base/MOLTextFieldProps.ts";
import {useTranslation} from "react-i18next";

/**
 * Component that preconfigures a text input for the email input type
 */
export function SectionIndexInput(props: MOLTextFieldProps) {
    const {t} = useTranslation()

    return (
        <TextField
            {...props}
            id="section-index"
            type="text"

            required

            label={t('components.input.section_index.label')}
            placeholder={t('components.input.section_index.placeholder')}

            sx={{mt: '16px'}}

            value={props.field.input.value}
            onChange={(e) => props.field.set(e.target.value)}
            variant="outlined"

            helperText={props.field.input.error ? t(props.field.input.error) : null}
            error={props.field.input.error != null}

            slotProps={{
                input: {
                    startAdornment: <InputAdornment
                        position="end">{t('components.input.section_index.prefix')}</InputAdornment>,
                },
            }}
        />
    )
}

/**
 * Component that preconfigures a text input for the email input type
 */
export function SectionNameInput(props: MOLTextFieldProps) {
    const {t} = useTranslation()

    return (
        <TextField
            {...props}
            id="section-name"
            type="text"

            required

            label={t('components.input.section_name.label')}
            placeholder={t('components.input.section_name.placeholder')}

            sx={{mt: '16px'}}

            value={props.field.input.value}
            onChange={(e) => props.field.set(e.target.value)}
            variant="outlined"

            helperText={props.field.input.error ? t(props.field.input.error) : null}
            error={props.field.input.error != null}
        />
    )
}

/**
 * Component that preconfigures a text input for the email input type
 */
export function SectionContentInput(props: MOLTextFieldProps) {
    const {t} = useTranslation()

    return (
        <TextField
            {...props}
            id="section-content"
            type="text"

            required

            multiline
            rows={8}

            label={t('components.input.section_content.label')}

            sx={{mt: '16px', width: '100%'}}

            value={props.field.input.value}
            onChange={(e) => props.field.set(e.target.value)}
            variant="outlined"

            helperText={props.field.input.error ? t(props.field.input.error) : null}
            error={props.field.input.error != null}
        />
    )
}