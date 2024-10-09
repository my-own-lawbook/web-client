import {FormControl} from "@mui/material";
import {DatePicker} from "@mui/x-date-pickers";
import MOLDatePickerProps from "./base/MOLDatePickerProps.ts";
import {useTranslation} from "react-i18next";

/**
 * Date picker configured for a birthday
 */
export default function BirthdayInput(props: MOLDatePickerProps) {
    const {t} = useTranslation()

    return (
        <FormControl>
            <DatePicker
                {...props}
                label={t('components.input.birthday.label')}
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