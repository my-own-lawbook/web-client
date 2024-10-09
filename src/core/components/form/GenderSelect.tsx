import Gender, {genderDisplayName} from "../../model/Gender.ts";
import {FormControl, FormHelperText, InputLabel, MenuItem, Select} from "@mui/material";
import MOLSelectProps from "./base/MOLSelectProps.ts"
import {useTranslation} from "react-i18next";

/**
 * Select component for selecting a gender
 */
export default function GenderSelect(props: MOLSelectProps<Gender | null>) {
    const {t} = useTranslation()

    const genders = [Gender.Male, Gender.Female, Gender.Other, Gender.Private]

    return (
        <FormControl error={props.field.input.error != null}>
            <InputLabel id="gender">{t('components.input.gender.label')}</InputLabel>
            <Select
                {...props}
                id="gender"
                name="gender"

                label={t('components.input.gender.label')} // Rendering is done by the <InputLabel/> tag, this makes sure the border makes place.

                variant={"outlined"}

                onChange={(e) => props.field.set(e.target.value as Gender)} // I don't know why we need to cast string to gender
                value={props.field.input.value}
            >
                {
                    genders.map(gender =>
                        <MenuItem
                            value={gender.valueOf()}
                            key={gender.valueOf()}
                        >
                            {genderDisplayName(gender)}
                        </MenuItem>
                    )
                }
            </Select>
            {props.field.input.error && <FormHelperText>{t(props.field.input.error)}</FormHelperText>}
        </FormControl>
    )
}