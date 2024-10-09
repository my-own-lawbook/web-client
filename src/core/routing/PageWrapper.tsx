import {Box} from "@mui/material";
import MOLAppBar from "../components/MOLAppBar.tsx";
import MOLFooter from "../components/MOLFooter.tsx";
import {PropsWithChildren} from "react";
import {useNavigate} from "react-router-dom";
import './PageWrapper.css'
import usePageWrapper from "./usePageWrapper.ts";
import {useAuth} from "../useAuth.ts";

/**
 * Component that wraps the whole app content (apart from the routes in /auth/*) and displays a footer and header.
 */
export default function PageWrapper(props: Readonly<PropsWithChildren>) {
    const navigate = useNavigate()
    const navigateHome = () => navigate("/")
    const auth = useAuth()

    const {
        profileDialogState,
        logout,
        logoutAll
    } = usePageWrapper()

    return (
        <Box
            className="page-wrapper"
        >
            <MOLAppBar
                onGoHome={navigateHome}
                onLogout={logout}
                onLogoutAll={logoutAll}
                onGoToProfile={() => profileDialogState.open(auth.authenticatedUser!)}
            />

            <Box className="page-wrapper-content">
                {props.children}
            </Box>

            <MOLFooter
                onLegalClick={() => {
                }}
                onAboutClick={() => {
                }}
                onHostInfoClick={() => {
                }}
            />
        </Box>
    )
}