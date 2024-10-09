import axios, {AxiosResponse} from "axios";
import {getAccessToken, getRefreshToken} from "../../storage/tokens.ts";
import {refreshApiCall} from "../authCalls.ts";

/**
 * Response from any api
 */
export class ApiResult<T> {

    /**
     * Whether the api call received a response.
     *
     * This does *not* say anything about the http status code, just that a response was received.
     */
    isSuccess: boolean
    /**
     * The http status value. Only present if 'isSuccess' is true
     */
    httpStatus?: number
    /**
     * Whether the http-response returned a successful code.
     *
     * True if httpStatus is present and between 200 and 399
     */
    isHttpSuccess?: boolean
    /**
     * The response body if the response returned a successful code. Only present if 'isSuccess' is true
     */
    data?: T
    /**
     * The response body if the response did not return a successful code. Only present if 'isSuccess' is false.
     */
    errorData?: unknown

    constructor(isSuccess: boolean, httpStatus?: number, isHttpSuccess?: boolean,
                data?: T, errorData?: unknown) {
        this.isSuccess = isSuccess
        this.httpStatus = httpStatus
        this.isHttpSuccess = isHttpSuccess
        this.data = data
        this.errorData = errorData
    }

    /**
     * Combines another result with this one. The first error is used
     * @param o1 The other result
     * @param mapper The mapper
     */
    combineWith1<O1, R>(o1: ApiResult<O1>, mapper: (value: T, o1: O1) => R): ApiResult<R> {
        if (!this.isSuccess || !this.isHttpSuccess)
            return new ApiResult<R>(this.isSuccess, this.httpStatus, this.isHttpSuccess, undefined, this.errorData)
        else if (!o1.isSuccess || !o1.isHttpSuccess)
            return new ApiResult<R>(this.isSuccess, this.httpStatus, this.isHttpSuccess, undefined, this.errorData)
        else
            return new ApiResult<R>(this.isSuccess, this.httpStatus, this.isHttpSuccess, mapper(this.data!, o1.data!), this.errorData)
    }

    /**
     * Combines two other results with this one. The first error is used
     * @param o1 The other result
     * @param o2 The other result
     * @param mapper The mapper
     */
    combineWith2<O1, O2, R>(o1: ApiResult<O1>, o2: ApiResult<O2>, mapper: (value: T, o1: O1, o2: O2) => R): ApiResult<R> {
        if (!this.isSuccess || !this.isHttpSuccess)
            return new ApiResult<R>(this.isSuccess, this.httpStatus, this.isHttpSuccess, undefined, this.errorData)
        else if (!o1.isSuccess || !o1.isHttpSuccess)
            return new ApiResult<R>(this.isSuccess, this.httpStatus, this.isHttpSuccess, undefined, this.errorData)
        else if (!o2.isSuccess || !o2.isHttpSuccess)
            return new ApiResult<R>(this.isSuccess, this.httpStatus, this.isHttpSuccess, undefined, this.errorData)
        else
            return new ApiResult<R>(this.isSuccess, this.httpStatus, this.isHttpSuccess, mapper(this.data!, o1.data!, o2.data!), this.errorData)
    }

    /**
     * Combines three other results with this one. The first error is used
     * @param o1 The other result
     * @param o2 The other result
     * @param o3 The other result
     * @param mapper The mapper
     */
    combineWith3<O1, O2, O3, R>(o1: ApiResult<O1>, o2: ApiResult<O2>, o3: ApiResult<O3>, mapper: (value: T, o1: O1, o2: O2, o3: O3) => R): ApiResult<R> {
        if (!this.isSuccess || !this.isHttpSuccess)
            return new ApiResult<R>(this.isSuccess, this.httpStatus, this.isHttpSuccess, undefined, this.errorData)
        else if (!o1.isSuccess || !o1.isHttpSuccess)
            return new ApiResult<R>(this.isSuccess, this.httpStatus, this.isHttpSuccess, undefined, this.errorData)
        else if (!o2.isSuccess || !o2.isHttpSuccess)
            return new ApiResult<R>(this.isSuccess, this.httpStatus, this.isHttpSuccess, undefined, this.errorData)
        else if (!o3.isSuccess || !o3.isHttpSuccess)
            return new ApiResult<R>(this.isSuccess, this.httpStatus, this.isHttpSuccess, undefined, this.errorData)
        else {
            return new ApiResult<R>(this.isSuccess, this.httpStatus, this.isHttpSuccess, mapper(this.data!, o1.data!, o2.data!, o3.data!), this.errorData)
        }
    }

    /**
     * Same as combineWith3, just that the other responses are being created
     * @param o1 The other result
     * @param o2 The other result
     * @param o3 The other result
     * @param mapper The mapping function
     */
    async combineWithMap3<O1, O2, O3, R>(o1: (value: T) => Promise<ApiResult<O1>>, o2: (value: T) => Promise<ApiResult<O2>>, o3: (value: T) => Promise<ApiResult<O3>>, mapper: (value: T, o1: O1, o2: O2, o3: O3) => R) {
        if (this.isSuccess && this.isHttpSuccess)
            return this.combineWith3(await o1(this.data!), await o2(this.data!), await o3(this.data!), mapper)
        else return new ApiResult<R>(this.isSuccess, this.httpStatus, this.isHttpSuccess, undefined, this.errorData)
    }

    /**
     * Maps the ApiResult to another object type
     * @param mapper The conversion function
     */
    map<R>(mapper: (value: T) => R): ApiResult<R> {
        if (this.isSuccess && this.isHttpSuccess)
            return new ApiResult<R>(this.isSuccess, this.httpStatus, this.isHttpSuccess, mapper(this.data!), this.errorData)
        else
            return new ApiResult<R>(this.isSuccess, this.httpStatus, this.isHttpSuccess, undefined, this.errorData)
    }

}

/**
 * Flattens a list of api results to an api result of lists
 * @param list The list
 */
export function flattenApiResultList<T>(list: ApiResult<T>[]): ApiResult<T[]> {
    if (list.every(result => result.isSuccess && result.isHttpSuccess))
        return new ApiResult<T[]>(true, list[0]?.httpStatus, true, list.map(result => result.data!), undefined)
    else return new ApiResult<T[]>(false, list[0]?.httpStatus, false, undefined, list[0]?.errorData)
}

/**
 * Creates a successful response
 * @param response The axios response
 */
function createResultFromResponse<T>(response: AxiosResponse<T>): ApiResult<T> {
    if (!(response.status >= 200 && response.status <= 299)) {
        throw new Error(`Axios returned success response but status was ${response.status}.`)
    }

    return new ApiResult<T>(true, response.status, true, response.data, undefined)
}

function createResultFromException<T>(error: unknown): ApiResult<T> {
    // @ts-expect-error Exception type is not known
    if (error.response) {
        // @ts-expect-error error is unknown type
        return new ApiResult<T>(true, error.response.status, false, undefined, error.response.data)
    } else {
        return new ApiResult<T>(false, undefined, undefined, undefined, undefined)
    }
}

const baseUrl = "http://descartes:8080/api/v1"

/**
 * Basic call to the mol-rest-api
 * @param path The relative path to request to
 * @param body The optional payload
 * @param method The http method
 * @param authHeader The optional auth header
 * @return The response
 */
export default async function apiCall<T>(path: string, body?: unknown, method: string = "get", authHeader: string | null = null): Promise<ApiResult<T>> {
    const url = baseUrl + path

    try {
        const response = await axios.request<T>({
            url: url,
            method: method,
            data: body,
            headers: {
                Authorization: authHeader,
                "Content-Type": "application/json"
            }
        })

        return createResultFromResponse(response)
    } catch (e) {
        return createResultFromException(e)
    }
}

/**
 * Authenticated api call to the mol-api.
 *
 * If the request fails because of an authentication issue, the /auth/login/refresh/ endpoint is hit to refresh the access token. If the request still fails, that is returned.
 *
 * @param path The path
 * @param body The body
 * @param method The method
 * @return The response
 */
export async function authenticatedApiCall<T>(path: string, body?: unknown, method: string = "get"): Promise<ApiResult<T>> {
    const genRequest = async () => {
        return await apiCall<T>(path, body, method, `Bearer ${getAccessToken()}`)
    }

    const firstResult = await genRequest()

    if (firstResult.isSuccess && (firstResult.httpStatus == 401 || firstResult.httpStatus == 403 || firstResult.httpStatus == 404)) {
        const refreshResponse = await refreshApiCall(getRefreshToken() ?? "")

        if (refreshResponse.isSuccess && refreshResponse.isHttpSuccess)
            return genRequest()
        else
            return firstResult
    } else
        return firstResult

}