import {createContext, useContext} from "react";
import {AuthProviderType} from "./AuthProvider.tsx";
import User from "./model/User.ts";


/**
 * The auth context with the default value
 */
const AuthContext = createContext<AuthProviderType>({
    authenticatedUser: null,
    refresh(): Promise<boolean> {
        return Promise.resolve(false)
    },
    toggleUserChanged(): Promise<User | null> {
        return Promise.resolve(null)
    },
    logout() {
        return Promise.resolve()
    },
    logoutAll() {
        return Promise.resolve()
    }
})

export default AuthContext

export function useAuth(): AuthProviderType {
    return useContext(AuthContext)
}