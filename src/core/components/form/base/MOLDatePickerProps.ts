import {DatePickerProps} from "@mui/x-date-pickers";
import {Dayjs} from "dayjs";
import {FormField} from "../../../hooks/form/useFormField.ts";

/**
 * Props for all text field
 */
type MOLDatePickerProps = {

    /**
     * The date form field
     */
    field: FormField<Dayjs | null>

} & Partial<DatePickerProps<Dayjs>>

export default MOLDatePickerProps