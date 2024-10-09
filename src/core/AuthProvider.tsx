import {PropsWithChildren, useState} from "react";
import User from "./model/User.ts";
import dayjs from "dayjs";
import {getRefreshToken, setAccessToken, setRefreshToken} from "./storage/tokens.ts";
import {fetchUserInfo, fetchUserProfile, logoutAllApiCall, logoutApiCall, refreshApiCall} from "./network/authCalls.ts";
import AuthContext from "./useAuth.ts";
import Gender, {genderFromString} from "./model/Gender.ts";

/**
 * The type of the authentication context
 */
export interface AuthProviderType {

    /**
     The authenticated user
     */
    authenticatedUser: User | null,
    /**
     * Invalidates the current refresh token and clears the access & refresh token storage
     */
    logout: () => Promise<void>,
    /**
     * Invalidates all refresh tokens and clears the access & refresh token storage
     */
    logoutAll: () => Promise<void>

    /**
     * Refreshes the current session
     *
     * @return Whether it was successful
     */
    refresh(): Promise<boolean>,

    /**
     * Will refresh the 'authenticatedUser' variable
     */
    toggleUserChanged(): Promise<User | null>,

}

/**
 * Provides basic auth operations as a React context
 * @param props The children
 */
export default function AuthProvider(props: PropsWithChildren) {
    const [authenticatedUser, setAuthenticatedUser] = useState<User | null>(null)

    const fetchUser = async (): Promise<User | null> => {
        const [userResult, profileResult] = await Promise.all([fetchUserInfo(), fetchUserProfile()])

        if (userResult.isSuccess && userResult.isHttpSuccess) {
            const user: User = {
                id: userResult.data!.id,
                email: userResult.data!.email,
                username: userResult.data!.username,
                isEmailVerified: userResult.data!.isEmailVerified,
                profile: null
            }

            if (profileResult.isSuccess && profileResult.isHttpSuccess) {
                user.profile = {
                    firstName: profileResult.data!.firstName,
                    lastName: profileResult.data!.lastName,
                    birthday: dayjs(profileResult.data!.birthday),
                    gender: genderFromString(profileResult.data!.gender) ?? Gender.Other,
                }
            }

            return user
        }

        return null
    }

    const refresh = async (): Promise<boolean> => {
        const token = getRefreshToken()
        if (token == null) {
            return false
        }

        const tokenResponse = await refreshApiCall(getRefreshToken()!)

        if (tokenResponse.isSuccess && tokenResponse.isHttpSuccess) {
            setRefreshToken(tokenResponse.data!.refreshToken)
            setAccessToken(tokenResponse.data!.accessToken)

            return true
        } else {
            return false
        }
    }

    const logout = async () => {
        const token = getRefreshToken()
        if (token) {
            await logoutApiCall(token)
        }

        setRefreshToken(null)
        setAccessToken(null)
        setAuthenticatedUser(null)
    }

    const logoutAll = async () => {
        await logoutAllApiCall()

        setRefreshToken(null)
        setAccessToken(null)
        setAuthenticatedUser(null)
    }

    const value: AuthProviderType = {
        authenticatedUser: authenticatedUser,
        async refresh(): Promise<boolean> {
            return refresh()
        },
        async toggleUserChanged(): Promise<User | null> {
            const user = await fetchUser()
            if (user != null) {
                setAuthenticatedUser(user)
            }
            return user
        },
        async logout() {
            await logout()
        },
        async logoutAll() {
            await logoutAll()
        }
    }

    return (
        <AuthContext.Provider value={value} children={props.children}/>
    )

}