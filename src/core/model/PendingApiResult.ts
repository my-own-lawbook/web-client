/**
 * Api result that may still be in pending state
 */
class PendingApiResult<T> {

    /**
     * Whether the result is still loading
     */
    isLoading: boolean
    /**
     * Whether an error occurred.
     *
     * Null if the response is still pending
     */
    isError: boolean | null
    /**
     * Whether the request has finished successfully
     */
    isFinishedSuccess: boolean
    /**
     * The data of the response.
     *
     * Null if the response is still pending
     */
    data: T | null

    /**
     * Refreshes the request
     */
    refresh: () => void

    /**
     * Refreshes the request, but does not toggle the loading state
     */
    refreshSilent: () => void

    constructor(isLoading: boolean, isError: boolean | null, isFinishedSuccess: boolean, data: T | null, refresh: () => void, refreshSilent: () => void) {
        this.isLoading = isLoading
        this.isError = isError
        this.isFinishedSuccess = isFinishedSuccess
        this.data = data
        this.refresh = refresh
        this.refreshSilent = refreshSilent
    }

    resolve<R>(resolver: (value: T) => R, defaultValue: R): R {
        return this.data == null ? defaultValue : resolver(this.data);
    }

}

export default PendingApiResult