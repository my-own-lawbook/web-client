import {useState} from "react";

/**
 * Represents the input state of a specific field in a form
 */
type InputValue<T> = {

    /**
     * The currently entered value
     */
    value: T,

    /**
     * The currently set error
     */
    error: string | null

}

/**
 * Represents a specific field in a form
 */
export type FormField<T> = {

    /**
     * The current input state of the field
     */
    input: InputValue<T>,

    /**
     * Whether the value differs from the initial value
     */
    isDirty: boolean,

    /**
     * Whether the value has been changed at all
     */
    isDirtyStrict: boolean,

    /**
     * Clears the errors of the current state
     */
    clearError(): void,

    /**
     * Sets the current error
     * @param error
     */
    setError(error: string | null): void,

    /**
     * Sets the input value
     * @param value The new value
     */
    set(value: T): void,

    /**
     * Validates the input and sets 'input.error' to a matching error
     *
     * @return Whether the field was an error
     */
    validate(): boolean,

    /**
     * Returns the value if it is dirty
     *
     * @return Undefined if the value has not been changed, the value if it is dirty
     */
    valueIfDirty(): T | undefined

}

/**
 * Args for the useFormField hook
 */
export type UseFormFieldArgs<T> = {

    /**
     * The initial value
     */
    initial: T,

    /**
     * The validation function
     * @param arg
     */
    validate: (arg: T) => string | null

}

/**
 * Hook to create a specific form field
 * @param args The args
 */
const useFormField = <T>(args: UseFormFieldArgs<T>): FormField<T> => {
    const [value, setValue] = useState(args.initial)
    const [error, setError] = useState<string | null>(null)
    const [isDirty, setIsDirty] = useState(false)
    const [isDirtyStrict, setIsDirtyStrict] = useState(false)

    return {
        input: {
            value: value,
            error: error
        },
        isDirty: isDirty,
        isDirtyStrict: isDirtyStrict,
        clearError() {
            setError(null)
        },
        setError(error: string | null) {
            setError(error)
        },
        set(value: T) {
            setValue(value)
            setIsDirtyStrict(true)
            setIsDirty(value != args.initial)
        },
        validate() {
            const error = args.validate(value)
            setError(error)
            return error != null
        },
        valueIfDirty(): T | undefined {
            return isDirty ? value : undefined
        }
    }
}

export default useFormField