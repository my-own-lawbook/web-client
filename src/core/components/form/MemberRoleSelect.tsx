import {FormControl, FormHelperText, InputLabel, MenuItem, Select} from "@mui/material";
import MOLSelectProps from "./base/MOLSelectProps.ts"
import {localizedRoleName, MemberRole} from "../../model/MemberRole.ts";
import {useTranslation} from "react-i18next";

/**
 * Select component for selecting a member role
 */
export default function MemberRoleSelect(props: MOLSelectProps<MemberRole>) {
    const {t} = useTranslation()

    const roles = [MemberRole.Member, MemberRole.Moderator, MemberRole.Admin]

    return (
        <FormControl
            error={props.field.input.error != null}
            sx={{
                width: '100%',
                mt: "16px"
            }}
        >
            <InputLabel id="member-role">{t('components.input.member_role.label')}</InputLabel>
            <Select
                {...props}
                id="member-role"
                name="member.role"

                label={t('components.input.member_role.label')} // Rendering is done by the <InputLabel/> tag, this makes sure the border makes place.

                variant={"outlined"}

                onChange={(e) => props.field.set(e.target.value as MemberRole)} // I don't know why we need to cast string to Member Role
                value={props.field.input.value}
            >
                {
                    roles.map(role =>
                        <MenuItem
                            value={role.valueOf()}
                            key={role.valueOf()}
                        >
                            {t(localizedRoleName(role))}
                        </MenuItem>
                    )
                }
            </Select>
            {props.field.input.error && <FormHelperText>{t(props.field.input.error)}</FormHelperText>}
        </FormControl>
    )
}