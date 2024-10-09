import AuthFormWrapperCard from "../AuthFormWrapperCard.tsx";
import EmailTextField from "../../../core/components/form/EmailTextField.tsx";
import PasswordFormInput from "../../../core/components/form/PasswordFormInput.tsx";
import UsernameFormInput from "../../../core/components/form/UsernameFormInput.tsx";
import {Link, Typography} from "@mui/material";
import SuccessHandlerProps from "../props/SuccessHandlerProps.ts";
import useSignup from "./useSignup.ts";
import './SignupCard.css'
import {Trans, useTranslation} from "react-i18next";

function LoginText(
    props: {
        onClick: () => void
    }
) {
    return (
        <Typography
            variant={"body2"}
        >
            <Trans i18nKey={"auth.signup.login_text"}>
                Already have an account?&nbsp;
                <Link
                    className="login-link"
                    onClick={props.onClick}
                >
                    Log in instead
                </Link>
            </Trans>
        </Typography>
    )
}

/**
 * Signup card
 * @param props The props
 */
export default function SignupCard(props: SuccessHandlerProps) {
    const {t} = useTranslation()
    const {state, onConfirm, onGoToLogin} = useSignup(props.onSuccess)

    return (
        <AuthFormWrapperCard
            title={t('auth.signup.card.title')}
            infoText={t('auth.signup.card.description')}
            confirmButtonText={t('auth.signup.card.confirm')}
            onConfirm={onConfirm}
            errorText={state.isError ? t('auth.error_banner.label') : undefined}
        >
            <EmailTextField
                required
                autoFocus
                field={state.email}
            />

            <PasswordFormInput
                field={state.password}
            />

            <UsernameFormInput
                field={state.username}
            />

            <LoginText
                onClick={onGoToLogin}
            />
        </AuthFormWrapperCard>

    )
}