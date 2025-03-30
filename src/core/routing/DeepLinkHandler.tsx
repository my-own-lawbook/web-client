import {Box, CircularProgress, Typography} from "@mui/material";
import './DeepLinkHandler.css'
import {useTranslation} from "react-i18next";
import {useEffect, useRef} from "react";
import {useNavigate} from "react-router-dom";
import {isMobile} from "react-device-detect"
import {ErrorOutlined} from "@mui/icons-material";
import useDeepLinkHandler, {DeepLinkHandlerState} from "./useDeepLinkHandler";

export default function DeepLinkHandler() {
    const navigate = useNavigate()
    const deepLinkState = useDeepLinkHandler()
    const didNavigate = useRef(false)

    useEffect(() => {
        if (deepLinkState == DeepLinkHandlerState.LOADING || deepLinkState == DeepLinkHandlerState.FAILED || deepLinkState == DeepLinkHandlerState.REDIRECTED)
            return
        if (!isMobile && deepLinkState.webTarget) {
            navigate(deepLinkState.webTarget)
        } else {
            setTimeout(() => {
                if (deepLinkState.webTarget) {
                    navigate(deepLinkState.webTarget)
                }
            }, 1500)

            if (deepLinkState.deepLinkTarget) {
                if (!didNavigate.current) {
                    window.location.href = deepLinkState.deepLinkTarget
                    return () => {
                        didNavigate.current = true
                    }
                }
            }
        }
    }, [deepLinkState, didNavigate, navigate]);

    switch (deepLinkState) {
        case DeepLinkHandlerState.LOADING: {
            return (<LoadingScreen/>)
        }
        case DeepLinkHandlerState.REDIRECTED: {
            return (<RedirectedScreen/>)
        }
        case DeepLinkHandlerState.FAILED: {
            return (<ErrorScreen/>)
        }
    }
}

function RedirectedScreen() {
    const {t} = useTranslation()

    return (
        <Box
            className="deep-link-handler"
        >
            <Box
                className="loading-container"
            >
                <Typography
                    variant={'h6'}
                >
                    {t('deep_link.redirected.label')}
                </Typography>
            </Box>
        </Box>
    )
}

function ErrorScreen() {
    const {t} = useTranslation()

    return (
        <Box
            className="deep-link-handler"
        >
            <Box
                className="loading-container"
            >
                <ErrorOutlined/>
                <Typography
                    variant={'h6'}
                >
                    {t('deep_link.error.label')}
                </Typography>
            </Box>
        </Box>
    )
}

function LoadingScreen() {
    const {t} = useTranslation()

    return (
        <Box
            className="deep-link-handler"
        >
            <Box
                className="loading-container"
            >
                <CircularProgress/>
                <Typography
                    variant={'h6'}
                >
                    {t('deep_link.loading.label')}
                </Typography>
            </Box>
        </Box>
    )
}