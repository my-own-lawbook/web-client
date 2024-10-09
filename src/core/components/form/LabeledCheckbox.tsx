import {Checkbox, CheckboxProps, FormControlLabel} from "@mui/material";

/**
 * Props for the LabeledCheckbox component
 */
type LabeledCheckboxProps = {

    /**
     * The label
     */
    label: string

} & Partial<CheckboxProps>

/**
 * Component to display a checkbox with a label
 * @param props The props
 */
export default function LabeledCheckbox(props: LabeledCheckboxProps) {
    return (
        <FormControlLabel
            control={
                <Checkbox {...props}/>
            }
            label={props.label}
        />
    )
}