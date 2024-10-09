import {FormControl} from "@mui/material";
import {DateTimePicker} from "@mui/x-date-pickers";
import MOLDateTimePickerProps from "./base/MOLDateTimePickerProps.ts";
import {useTranslation} from "react-i18next";

/**
 * Date picker configured for a birthday
 */
export default function ExpirationDateInput(props: MOLDateTimePickerProps) {
    const {t} = useTranslation()

    return (
        <FormControl sx={{width: '100%'}}>
            <DateTimePicker
                {...props}

                label={t('components.input.expiration.label')}
                onChange={(e) => props.field.set(e)}
                slotProps={{
                    textField: {
                        error: props.field.input.error != null,
                        helperText: props.field.input.error ? t(props.field.input.error) : null
                    }
                }}
            />
        </FormControl>
    )
}