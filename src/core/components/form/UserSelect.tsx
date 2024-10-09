import MOLSelectProps from "./base/MOLSelectProps.ts";
import ForeignUser from "../../model/ForeignUser.ts";
import {FormControl, FormHelperText, InputLabel, MenuItem, Select} from "@mui/material";
import {formatName} from "../../formatting/stringFormatting.ts";
import {useTranslation} from "react-i18next";

/**
 * Props for the UserSelect component
 */
type UserSelectProps = {

    /**
     * The users that cab be selected
     */
    selectableUsers: ForeignUser[] | null

} & MOLSelectProps<ForeignUser | null>

/**
 * Component for a dropdown to select one of multiple users
 * @param props
 * @constructor
 */
export default function UserSelect(props: UserSelectProps) {
    const {t} = useTranslation()

    const {selectableUsers, field, ...selectProps} = props

    return (
        <FormControl error={props.field.input.error != null}
                     sx={{width: '100%', mt: '16px'}}>
            <InputLabel id="user">{t('components.input.user.label')}</InputLabel>
            <Select
                {...selectProps}
                id="user"
                name="user"

                label={t('components.input.user.label')}// Rendering is done by the <InputLabel/> tag, this makes sure the border makes place.

                variant={"outlined"}

                onChange={(e) => {
                    field.set(selectableUsers!.filter(user => user.id == e.target.value)[0])
                }} // I don't know why we need to cast unknown to ForeignUser
                value={field.input.value?.id ?? ''}
            >
                {
                    selectableUsers ? selectableUsers.map(user =>
                        <MenuItem
                            value={user.id}
                            key={user.id}
                        >
                            {formatName(user)}
                        </MenuItem>
                    ) : null
                }
            </Select>
            {field.input.error &&
                <FormHelperText>{props.field.input.error ? t(props.field.input.error) : null}</FormHelperText>}
        </FormControl>
    )
}