import {PropsWithChildren} from "react";
import {Box} from "@mui/material";
import './AuthScreenBackground.css'

/**
 * Creates the background for the auth screen
 */
export default function AuthScreenBackground(props: Readonly<PropsWithChildren>) {
    return (
        <Box
            className="auth-screen-background">
            {props.children}
        </Box>
    )
}