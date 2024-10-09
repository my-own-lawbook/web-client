import {ApiResult} from "../base/apiCall.ts";

/**
 * Generic type for a structured error response
 */
type ErrorBody<Info> = {

    /**
     * The error type
     */
    errorType: string,

    /**
     * The type specific info
     */
    info: Info

}

function isErrorType(result: ApiResult<unknown>, type: string): boolean {
    if (!result.isSuccess || result.isHttpSuccess) return false

    const errorData = result.errorData!
    if (typeof errorData !== 'object') {
        return false
    }
    if ('errorType' in errorData && 'info' in errorData) {
        if (errorData.errorType == type) {
            return true
        }
    }

    return false
}

/**
 * Checks a given request and returns a typed conflict_unique error body
 * @param result The error body, or null if the error type was not conflict_unique
 */
export function asConflictUniqueError(result: ApiResult<unknown>): ErrorBody<ConflictUniqueInfo> | null {
    if (!isErrorType(result, 'conflict_unique'))
        return null

    const errorData = result.errorData
    // @ts-expect-error 'info' is asserted to be member of errorData in 'isErrorType'
    const info = errorData.info

    if ('field' in info && 'value' in info) {
        return {
            errorType: 'conflict_unique',
            info: {
                field: info.field,
                value: info.value
            }
        }
    } else {
        return null
    }
}

//
// Infos
//

/**
 * When 409 is returned because of unique constraint
 */
type ConflictUniqueInfo = {

    /**
     * The affected field
     */
    field: string,

    /**
     * The non-unique value
     */
    value: string

}