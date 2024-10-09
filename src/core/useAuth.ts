import {createContext, useContext} from "react";
import {AuthProviderType} from "./AuthProvider.tsx";
import User from "./model/User.ts";


/**
 * The auth context with the default value
 */
const AuthContext = createContext<AuthProviderType>({
    authenticatedUser: null,
    refresh(): Promise<boolean> {
        return Promise.reject()
    },
    toggleUserChanged(): Promise<User | null> {
        return Promise.reject()
    },
    logout() {
        return Promise.reject()
    },
    logoutAll() {
        return Promise.reject()
    }
})

export default AuthContext

export function useAuth(): AuthProviderType {
    return useContext(AuthContext)
}