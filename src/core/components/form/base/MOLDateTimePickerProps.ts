import {DateTimePickerProps} from "@mui/x-date-pickers";
import {Dayjs} from "dayjs";
import {FormField} from "../../../hooks/form/useFormField.ts";

/**
 * Props for all text field
 */
type MOLDateTimePickerProps = {

    /**
     * The date form field
     */
    field: FormField<Dayjs | null>

} & Partial<DateTimePickerProps<Dayjs>>

export default MOLDateTimePickerProps