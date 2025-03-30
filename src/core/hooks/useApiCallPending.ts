import {useCallback, useEffect, useState} from "react";
import PendingApiResult from "../model/PendingApiResult.ts";
import {ApiResult} from "../network/base/apiCall.ts";

/**
 * Options for the useApiCallPending hook.
 */
type UseApiCallPendingOptions = {

    /**
     * Whether the api call should only be simulated ond simply return loading always.
     */
    doLoading?: boolean,

    /**
     * Whether the api call should only be simulated ond simply return error always.
     */
    doError?: boolean,

    /**
     * The keys the api result should be redone on change.
     */
    keys?: readonly unknown[]

}

/**
 * Wraps an api call to return a PendingApiResult for easier access
 * @param apiCall The call resulting in the ApiResult
 * @param config The config options for the hook
 */
const useApiCallPending = <T>(apiCall: () => Promise<ApiResult<T>>, config?: UseApiCallPendingOptions): PendingApiResult<T> => {
    const [isLoading, setIsLoading] = useState(true)
    const [isError, setIsError] = useState<boolean | null>(null)
    const [data, setData] = useState<T | null>(null)

    const additionalKeys = config?.keys ?? []
    // For some reason, apiCall is seen as new every render.
    // eslint-disable-next-line
    const memoizedApiCall = useCallback(apiCall, [config?.doLoading, ...additionalKeys]);

    const updateData = () => {
        const fetch = async () => {
            setIsLoading(true)
            if (config?.doError) {
                setIsError(true)
                return
            }
            if (config?.doLoading) {
                return
            }

            const result = await memoizedApiCall()

            if (result.isSuccess && result.isHttpSuccess) {
                setData(result.data!)
            } else {
                setIsError(true)
            }
            setIsLoading(false)
        }

        fetch().then()
    }

    const updateDataSilent = () => {
        const fetch = async () => {
            const result = await memoizedApiCall()

            if (result.isSuccess && result.isHttpSuccess) {
                setData(result.data ?? null)
            } else {
                setIsError(true)
            }
        }

        fetch().then()
    }

    useEffect(updateData, [memoizedApiCall, config?.doLoading, config?.doError]);

    return new PendingApiResult<T>(isLoading, isError, !isLoading && data != null, data, updateData, updateDataSilent)
}

export default useApiCallPending