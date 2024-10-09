import {Navigate, useLocation} from "react-router-dom";
import {PropsWithChildren} from "react";
import {useAuth} from "../useAuth.ts";

/**
 * Wrapper component that wraps components which should only be accessible when the user is fully authenticated.
 *
 * If authentication is not resolved successfully, the user is redirected to /auth/ with the corresponding 'redirect' parameter.
 *
 * While auth status is being resolved, a loading header is shown to the user
 *
 * @param props The children of the route
 */
export default function Authenticated(props: PropsWithChildren) {
    const auth = useAuth()
    const location = useLocation()

    const authenticated = auth.authenticatedUser != null &&
        auth.authenticatedUser.profile != null &&
        auth.authenticatedUser.isEmailVerified

    if (authenticated == null) {
        return <h1>Loading</h1>
    } else if (authenticated) {
        return props.children
    } else {
        return <Navigate to={`/auth/?redirect=${location.pathname}`} replace/>
    }
}