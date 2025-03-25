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

    /**
     * Maps the value of this api result to another.
     *
     * @param mapper The conversion function
     */
    map<R>(mapper: (value: T) => R): PendingApiResult<R> {
        return new PendingApiResult(this.isLoading, this.isError, this.isFinishedSuccess, this.data == null ? null : mapper(this.data), this.refresh, this.refreshSilent)
    }

    resolve<R>(resolver: (value: T) => R, defaultValue: R): R {
        return this.data == null ? defaultValue : resolver(this.data);
    }

}

/**
 * Combines two pending api results logically.
 *
 * @param par1 The first api result
 * @param par2 The second api result
 * @param mapper The mapping function
 */
export function combinePendingApiResults2<T1, T2, R>(par1: PendingApiResult<T1>, par2: PendingApiResult<T2>, mapper: (d1: T1, d2: T2) => R): PendingApiResult<R> {
    const pars = [par1, par2]
    return new PendingApiResult<R>(
        pars.some(par => par.isLoading),
        pars.some(par => par.isError),
        pars.every(par => par.isFinishedSuccess),
        pars.every(par => par.data != null) ? mapper(par1.data!, par2.data!) : null,
        () => {
            pars.forEach(par => par.refresh())
        },
        () => {
            pars.forEach(par => par.refreshSilent())
        }
    )
}

/**
 * Combines three pending api results logically.
 *
 * @param par1 The first api result
 * @param par2 The second api result
 * @param par3 The third api result
 * @param mapper The mapping function
 */
export function combinePendingApiResults3<T1, T2, T3, R>(par1: PendingApiResult<T1>, par2: PendingApiResult<T2>, par3: PendingApiResult<T3>, mapper: (d1: T1, d2: T2, d3: T3) => R): PendingApiResult<R> {
    const pars = [par1, par2, par3]
    return new PendingApiResult<R>(
        pars.some(par => par.isLoading),
        pars.some(par => par.isError),
        pars.every(par => par.isFinishedSuccess),
        pars.every(par => par.data != null) ? mapper(par1.data!, par2.data!, par3.data!) : null,
        () => {
            pars.forEach(par => par.refresh())
        },
        () => {
            pars.forEach(par => par.refreshSilent())
        }
    )
}

/**
 * Combines four pending api results logically.
 *
 * @param par1 The first api result
 * @param par2 The second api result
 * @param par3 The third api result
 * @param par4 The fourth api result
 * @param mapper The mapping function
 */
export function combinePendingApiResults4<T1, T2, T3, T4, R>(par1: PendingApiResult<T1>, par2: PendingApiResult<T2>, par3: PendingApiResult<T3>, par4: PendingApiResult<T4>, mapper: (d1: T1, d2: T2, d3: T3, d4: T4) => R): PendingApiResult<R> {
    const pars = [par1, par2, par3, par4]
    return new PendingApiResult<R>(
        pars.some(par => par.isLoading),
        pars.some(par => par.isError),
        pars.every(par => par.isFinishedSuccess),
        pars.every(par => par.data != null) ? mapper(par1.data!, par2.data!, par3.data!, par4.data!) : null,
        () => {
            pars.forEach(par => par.refresh())
        },
        () => {
            pars.forEach(par => par.refreshSilent())
        }
    )
}

export default PendingApiResult