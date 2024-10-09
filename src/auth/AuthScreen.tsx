import LoginCard from "./screen/login/LoginCard.tsx";
import SignupCard from "./screen/signup/SignupCard.tsx";
import {Route, Routes, useLocation, useNavigate, useSearchParams} from "react-router-dom";
import EmailVerifyCard from "./screen/email-verify/EmailVerifyCard.tsx";
import SetProfileCard from "./screen/profile/SetProfileCard.tsx";
import {useCallback, useEffect} from "react";
import AuthScreenBackground from "./AuthScreenBackground.tsx";
import {useAuth} from "../core/useAuth.ts";

/**
 * Root auth path
 */
const AUTH_PATH = "/auth/"

/**
 * Path for signup
 */
const SIGNUP_PATH = AUTH_PATH + "signup/"

/**
 * Path for email verify
 */
const EMAIL_VERIFY_PATH = SIGNUP_PATH + "email-verify/"

/**
 * Path for profile
 */
const PROFILE_PATH = SIGNUP_PATH + "profile/"

/**
 * Redirect arg name
 */
const REDIRECT_ARG = "redirect"

/**
 * Email arg name
 */
const EMAIL_ARG = "email"

/**
 * Adds the redirect arg to the path name
 * @param path The path
 * @param redirect The redirect path
 */
const withRedirectArg = (path: string, redirect: string | null): string => {
    return path + `?${REDIRECT_ARG}=${redirect ?? '/'}`
}

/**
 * Adds the email arg to the path name
 * @param path The path
 * @param email The email value
 */
const withEmailArg = (path: string, email: string | undefined): string => {
    return path + `&${EMAIL_ARG}=${email}`
}

/**
 * Component for the auth screen whose main purpose is to manage the redirects to the other auth screens.
 * @constructor
 */
export default function AuthScreen() {
    const navigate = useNavigate()
    const location = useLocation()
    const auth = useAuth()
    const [params] = useSearchParams()

    const navigateToAuthRoot = async () => {
        await auth.toggleUserChanged()
        navigate(AUTH_PATH)
    }

    const redirectToNextRoute = useCallback(async () => {
        const user = await auth.toggleUserChanged()

        const redirectArg = params.get(REDIRECT_ARG)

        const signupPath = withRedirectArg(SIGNUP_PATH, redirectArg)
        const emailVerifyPath = withEmailArg(withRedirectArg(EMAIL_VERIFY_PATH, redirectArg), user?.email)
        const profilePath = withRedirectArg(PROFILE_PATH, redirectArg)

        if (user == null) {
            navigate(signupPath, {replace: true})
        } else if (!user.isEmailVerified) {
            navigate(emailVerifyPath, {replace: true})
        } else if (user.profile == null) {
            navigate(profilePath, {replace: true})
        } else {
            navigate(redirectArg ?? '/', {replace: true})
        }
    }, [navigate, params, auth])

    useEffect(() => {
        if (location.pathname.endsWith(AUTH_PATH)) {
            redirectToNextRoute().then()
        }
    }, [location, redirectToNextRoute]);

    return (
        <Routes>
            <Route path="login/" element={
                <AuthScreenBackground>
                    <LoginCard onSuccess={navigateToAuthRoot}/>
                </AuthScreenBackground>
            }
            />
            <Route
                path="signup/"
                element={
                    <AuthScreenBackground>
                        <SignupCard
                            onSuccess={navigateToAuthRoot}
                        />
                    </AuthScreenBackground>
                }
            />
            <Route
                path="signup/email-verify/"
                element={
                    <AuthScreenBackground>
                        <EmailVerifyCard onSuccess={navigateToAuthRoot}/>
                    </AuthScreenBackground>
                }
            />
            <Route
                path="signup/profile/"
                element={
                    <AuthScreenBackground>
                        <SetProfileCard onSuccess={navigateToAuthRoot}/>
                    </AuthScreenBackground>
                }
            />
        </Routes>
    )
}