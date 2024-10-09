import AuthFormWrapperCard from "../AuthFormWrapperCard.tsx";
import EmailTextField from "../../../core/components/form/EmailTextField.tsx";
import PasswordFormInput from "../../../core/components/form/PasswordFormInput.tsx";
import {Link, Typography} from "@mui/material";
import {useNavigate} from "react-router-dom";
import SuccessHandlerProps from "../props/SuccessHandlerProps.ts";
import useLogin from "./useLogin.ts";
import './LoginCard.css'
import {Trans, useTranslation} from "react-i18next";

function SignupText(
    props: {
        onClick: () => void
    }
) {
    return (
        <Typography
            variant={"body2"}
        >
            <Trans i18nKey={'auth.login.card.signup_info'}>
                Do not yet have an account?&nbsp;
                <Link
                    className="signup-link"
                    onClick={props.onClick}
                >
                    Sign up
                </Link>
            </Trans>
        </Typography>
    )
}

/**
 * Login Card
 * @param props The props
 */
export default function LoginCard(props: SuccessHandlerProps) {
    const navigate = useNavigate()
    const {t} = useTranslation()
    const {state, onSubmit} = useLogin(props.onSuccess)

    return (
        <AuthFormWrapperCard
            title={t('auth.login.card.title')}
            infoText={t('auth.login.card.description')}
            onConfirm={onSubmit}
            confirmButtonText={t('auth.login.card.confirm')}
            errorText={state.isError ? t('auth.error_banner.label') : undefined}
        >
            <EmailTextField
                field={state.email}
            />

            <PasswordFormInput
                field={state.password}
            />
            <SignupText onClick={() => navigate("../signup/")}/>
        </AuthFormWrapperCard>

    )
}