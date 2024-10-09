import AuthFormWrapperCard from "../AuthFormWrapperCard.tsx";
import {Alert, Button, Stack, Typography} from "@mui/material";
import EmailVerifyTokenInput from "../../../core/components/form/EmailVerifyTokenInput.tsx";
import SuccessHandlerProps from "../props/SuccessHandlerProps.ts";
import useEmailVerify from "./useEmailVerify.ts";
import {useSearchParams} from "react-router-dom";
import {Trans, useTranslation} from "react-i18next";

/**
 * Component for entering the email verifying code
 */
export default function EmailVerifyCard(props: Readonly<SuccessHandlerProps>) {
    const {t} = useTranslation()
    const [params] = useSearchParams()

    const {state, onConfirm, onRequestNewEmail} = useEmailVerify(props.onSuccess)

    return (
        <AuthFormWrapperCard
            title={t('auth.email_verify.card.title')}
            infoText={
                <Typography variant={"body2"}>
                    <Trans i18nKey={"auth.email_verify.card.description"} values={{email: params.get('email')}}>
                        _
                        <Typography align={"center"} fontWeight={'600'}>_</Typography><br/>
                        _
                    </Trans>
                </Typography>
            }
        >
            <EmailVerifyTokenInput
                required
                autoFocus
                field={state.token}
            />

            {state.isError ?
                <Alert variant={"standard"} severity={"error"}>{t('auth.error_banner.label')}</Alert>
                : null}

            {state.isSuccess ?
                <Alert variant={"standard"} severity={"success"}>{t('auth.email_verify.success')}</Alert>
                : null}

            <Stack
                direction="row"
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between'
                }}
            >
                <Button
                    variant="outlined"
                    onClick={onRequestNewEmail}
                    disabled={!state.canRequestEmail}
                >{t('auth.email_verify.card.request_new_button_label')}</Button>

                <Button
                    onClick={onConfirm}
                    variant="contained"
                >{t('auth.email_verify.card.confirm_button_label')}</Button>
            </Stack>
        </AuthFormWrapperCard>
    )
}