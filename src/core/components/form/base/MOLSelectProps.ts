import {SelectProps} from "@mui/material";
import {FormField} from "../../../hooks/form/useFormField.ts";

/**
 * Props for all selects
 */
type MOLSelectProps<T> = {

    /**
     * The form field
     */
    field: FormField<T>

} & Partial<SelectProps>

export default MOLSelectProps