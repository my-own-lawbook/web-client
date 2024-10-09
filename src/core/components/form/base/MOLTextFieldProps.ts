import {TextFieldProps} from "@mui/material";
import {FormField} from "../../../hooks/form/useFormField.ts";

/**
 * Props for all text field
 */
type MOLTextFieldProps = {

    /**
     * The form field data
     */
    field: FormField<string>

} & Partial<TextFieldProps>

export default MOLTextFieldProps