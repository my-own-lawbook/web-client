import {TextField} from "@mui/material";
import CivorisTextFieldProps from "./base/CivorisTextFieldProps.ts";
import {useTranslation} from "react-i18next";

/**
 * Component that preconfigures a text input for the book description input
 */
export default function BookDescriptionTextField(props: CivorisTextFieldProps) {
    const {t} = useTranslation()

    return (
        <TextField
            {...props}
            id="book_description"
            type="text"

            label={t('components.input.book_description.label')}
            placeholder={t('components.input.book_description.placeholder')}

            sx={{mt: '16px', width: '100%'}}
            multiline
            aria-multiline
            rows={4}

            value={props.field.input.value}
            onChange={(e) => props.field.set(e.target.value)}
            variant="outlined"

            helperText={props.field.input.error ? t(props.field.input.error) : null}
            error={props.field.input.error != null}
        />
    )
}