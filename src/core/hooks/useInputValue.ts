import {useState} from "react";

/**
 * Hook returned
 */
interface InputValueHook<T> {

    /**
     * The value
     */
    value: T,

    /**
     * The error
     */
    error: string | null,

    /**
     * Sets the error
     * @param error The error
     */
    setError: (error: string | null) => void,

    /**
     * Sets the value
     * @param value The value
     */
    set: (value: T) => void,

    /**
     * Sets the error to null
     */
    clearError: () => void,

    /**
     * Sets error to the value of 'func' invoked with the value and returns whether error is not null or not
     * @param func The validation function
     * @param errorOverride The error to use to override
     */
    validate(func: (value: T) => string | null, errorOverride?: string): boolean

}

/**
 * Hook for a specific input value
 */
const useInputValue = <T>(initialValue: T, initialError: string | null = null): InputValueHook<T> => {
    const [value, setValue] = useState(initialValue)
    const [error, setError] = useState(initialError)

    return {
        value: value,
        error: error,
        setError: setError,
        set: setValue,
        clearError: () => setError(null),
        validate: (func: (value: T) => string | null, errorOverride?: string) => {
            const newError = func(value)
            if (newError == null) {
                setError(null)
            } else {
                setError(errorOverride ?? newError)
            }

            return newError == null
        }
    }
}

export default useInputValue