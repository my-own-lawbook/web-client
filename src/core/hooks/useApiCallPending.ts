import {useCallback, useEffect, useState} from "react";
import PendingApiResult from "../model/PendingApiResult.ts";
import {ApiResult} from "../network/base/apiCall.ts";

/**
 * Wraps an api call to return a PendingApiResult for easier access
 * @param apiCall The call resulting in the ApiResult
 * @param doLoading If the call should only be simulated and set to loading
 */
const useApiCallPending = <T>(apiCall: () => Promise<ApiResult<T>>, doLoading?: boolean): PendingApiResult<T> => {
    const [isLoading, setIsLoading] = useState(false)
    const [isError, setIsError] = useState<boolean | null>(null)
    const [data, setData] = useState<T | null>(null)

    // For some reason, apiCall is seen as new every render.
    // eslint-disable-next-line
    const memoizedApiCall = useCallback(apiCall, [doLoading]);

    const updateData = () => {
        const fetch = async () => {
            setIsLoading(true)
            if (doLoading == true) {
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
                setData(result.data!)
            } else {
                setIsError(true)
            }
        }

        fetch().then()
    }

    useEffect(updateData, [memoizedApiCall, doLoading]);

    return new PendingApiResult<T>(isLoading, isError, !isLoading && data != null, data, updateData, updateDataSilent)
}

export default useApiCallPending