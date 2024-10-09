import {IconButton, TextField} from "@mui/material";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import {useState} from "react";
import MOLTextFieldProps from "./base/MOLTextFieldProps.ts";
import {useTranslation} from "react-i18next";

/**
 * Component that preconfigures a text input for the password type
 */
export default function PasswordFormInput(props: MOLTextFieldProps) {
    const {t} = useTranslation()

    const [valueVisible, setValueVisible] = useState(false)

    // noinspection XmlDeprecatedElement
    return (
        <TextField
            {...props}
            id="password"
            name="email-token"
            sx={{mt: '4px'}}

            label={t('components.input.password.label')}
            placeholder={t('components.input.password.placeholder')}

            type={valueVisible ?
                "text" : "password"}

            value={props.field.input.value}
            onChange={(e) => props.field.set(e.target.value)}

            variant="outlined"

            helperText={props.field.input.error ? t(props.field.input.error) : null}
            error={props.field.input.error != null}

            slotProps={{
                input: {
                    endAdornment: <IconButton onClick={() => setValueVisible(!valueVisible)}>
                        {valueVisible ?
                            <VisibilityOff/>
                            : <Visibility/>}
                    </IconButton>,
                },
            }}
        />
    )
}