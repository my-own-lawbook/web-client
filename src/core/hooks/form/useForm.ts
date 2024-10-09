// noinspection DuplicatedCode

/**
 * Represents a form with multiple fields
 */
import useFormField, {FormField, UseFormFieldArgs} from "./useFormField.ts";


type InputForm1<T1> = {


    /**
     * Field no 1
     */
    field1: FormField<T1>,

    /**
     * Validates all fields in the form
     * @return Whether any of the fields was an error
     */
    validateAll(): boolean,

    /**
     * Clears the errors of all fields
     */
    clearAllErrors(): void

}

export function useForm1<T1>(arg1: UseFormFieldArgs<T1>): InputForm1<T1> {
    const field1 = useFormField(arg1)

    return {
        field1: field1,
        validateAll() {
            return [field1.validate()]
                .some(x => x)
        },
        clearAllErrors() {
            [field1].forEach(f => f.clearError())
        }
    }
}


/**
 * Represents a form with multiple fields
 */

export type InputForm2<T1, T2> = {


    /**
     * Field no 1
     */
    field1: FormField<T1>,

    /**
     * Field no 2
     */
    field2: FormField<T2>,

    /**
     * Validates all fields in the form
     * @return Whether any of the fields was an error
     */
    validateAll(): boolean,

    /**
     * Clears the errors of all fields
     */
    clearAllErrors(): void

}

export function useForm2<T1, T2>(arg1: UseFormFieldArgs<T1>, arg2: UseFormFieldArgs<T2>): InputForm2<T1, T2> {
    const field1 = useFormField(arg1)
    const field2 = useFormField(arg2)

    return {
        field1: field1,
        field2: field2,
        validateAll() {
            return [field1.validate(), field2.validate()]
                .some(x => x)
        },
        clearAllErrors() {
            [field1, field2].forEach(f => f.clearError())
        }
    }
}


/**
 * Represents a form with multiple fields
 */

export type InputForm3<T1, T2, T3> = {


    /**
     * Field no 1
     */
    field1: FormField<T1>,

    /**
     * Field no 2
     */
    field2: FormField<T2>,

    /**
     * Field no 3
     */
    field3: FormField<T3>,

    /**
     * Validates all fields in the form
     * @return Whether any of the fields was an error
     */
    validateAll(): boolean,

    /**
     * Clears the errors of all fields
     */
    clearAllErrors(): void

}

export function useForm3<T1, T2, T3>(arg1: UseFormFieldArgs<T1>, arg2: UseFormFieldArgs<T2>, arg3: UseFormFieldArgs<T3>): InputForm3<T1, T2, T3> {
    const field1 = useFormField(arg1)
    const field2 = useFormField(arg2)
    const field3 = useFormField(arg3)

    return {
        field1: field1,
        field2: field2,
        field3: field3,
        validateAll() {
            return [field1.validate(), field2.validate(), field3.validate()]
                .some(x => x)
        },
        clearAllErrors() {
            [field1, field2, field3].forEach(f => f.clearError())
        }
    }
}


/**
 * Represents a form with multiple fields
 */

type InputForm4<T1, T2, T3, T4> = {


    /**
     * Field no 1
     */
    field1: FormField<T1>,

    /**
     * Field no 2
     */
    field2: FormField<T2>,

    /**
     * Field no 3
     */
    field3: FormField<T3>,

    /**
     * Field no 4
     */
    field4: FormField<T4>,

    /**
     * Validates all fields in the form
     * @return Whether any of the fields was an error
     */
    validateAll(): boolean,

    /**
     * Clears the errors of all fields
     */
    clearAllErrors(): void

}

export function useForm4<T1, T2, T3, T4>(arg1: UseFormFieldArgs<T1>, arg2: UseFormFieldArgs<T2>, arg3: UseFormFieldArgs<T3>, arg4: UseFormFieldArgs<T4>): InputForm4<T1, T2, T3, T4> {
    const field1 = useFormField(arg1)
    const field2 = useFormField(arg2)
    const field3 = useFormField(arg3)
    const field4 = useFormField(arg4)

    return {
        field1: field1,
        field2: field2,
        field3: field3,
        field4: field4,
        validateAll() {
            return [field1.validate(), field2.validate(), field3.validate(), field4.validate()]
                .some(x => x)
        },
        clearAllErrors() {
            [field1, field2, field3, field4].forEach(f => f.clearError())
        }
    }
}


/**
 * Represents a form with multiple fields
 */

type InputForm5<T1, T2, T3, T4, T5> = {


    /**
     * Field no 1
     */
    field1: FormField<T1>,

    /**
     * Field no 2
     */
    field2: FormField<T2>,

    /**
     * Field no 3
     */
    field3: FormField<T3>,

    /**
     * Field no 4
     */
    field4: FormField<T4>,

    /**
     * Field no 5
     */
    field5: FormField<T5>,

    /**
     * Validates all fields in the form
     * @return Whether any of the fields was an error
     */
    validateAll(): boolean,

    /**
     * Clears the errors of all fields
     */
    clearAllErrors(): void

}

export function useForm5<T1, T2, T3, T4, T5>(arg1: UseFormFieldArgs<T1>, arg2: UseFormFieldArgs<T2>, arg3: UseFormFieldArgs<T3>, arg4: UseFormFieldArgs<T4>, arg5: UseFormFieldArgs<T5>): InputForm5<T1, T2, T3, T4, T5> {
    const field1 = useFormField(arg1)
    const field2 = useFormField(arg2)
    const field3 = useFormField(arg3)
    const field4 = useFormField(arg4)
    const field5 = useFormField(arg5)

    return {
        field1: field1,
        field2: field2,
        field3: field3,
        field4: field4,
        field5: field5,
        validateAll() {
            return [field1.validate(), field2.validate(), field3.validate(), field4.validate(), field5.validate()]
                .some(x => x)
        },
        clearAllErrors() {
            [field1, field2, field3, field4, field5].forEach(f => f.clearError())
        }
    }
}


/**
 * Represents a form with multiple fields
 */

type InputForm6<T1, T2, T3, T4, T5, T6> = {


    /**
     * Field no 1
     */
    field1: FormField<T1>,

    /**
     * Field no 2
     */
    field2: FormField<T2>,

    /**
     * Field no 3
     */
    field3: FormField<T3>,

    /**
     * Field no 4
     */
    field4: FormField<T4>,

    /**
     * Field no 5
     */
    field5: FormField<T5>,

    /**
     * Field no 6
     */
    field6: FormField<T6>,

    /**
     * Validates all fields in the form
     * @return Whether any of the fields was an error
     */
    validateAll(): boolean,

    /**
     * Clears the errors of all fields
     */
    clearAllErrors(): void

}

export function useForm6<T1, T2, T3, T4, T5, T6>(arg1: UseFormFieldArgs<T1>, arg2: UseFormFieldArgs<T2>, arg3: UseFormFieldArgs<T3>, arg4: UseFormFieldArgs<T4>, arg5: UseFormFieldArgs<T5>, arg6: UseFormFieldArgs<T6>): InputForm6<T1, T2, T3, T4, T5, T6> {
    const field1 = useFormField(arg1)
    const field2 = useFormField(arg2)
    const field3 = useFormField(arg3)
    const field4 = useFormField(arg4)
    const field5 = useFormField(arg5)
    const field6 = useFormField(arg6)

    return {
        field1: field1,
        field2: field2,
        field3: field3,
        field4: field4,
        field5: field5,
        field6: field6,
        validateAll() {
            return [field1.validate(), field2.validate(), field3.validate(), field4.validate(), field5.validate(), field6.validate()]
                .some(x => x)
        },
        clearAllErrors() {
            [field1, field2, field3, field4, field5, field6].forEach(f => f.clearError())
        }
    }
}


/**
 * Represents a form with multiple fields
 */

type InputForm7<T1, T2, T3, T4, T5, T6, T7> = {


    /**
     * Field no 1
     */
    field1: FormField<T1>,

    /**
     * Field no 2
     */
    field2: FormField<T2>,

    /**
     * Field no 3
     */
    field3: FormField<T3>,

    /**
     * Field no 4
     */
    field4: FormField<T4>,

    /**
     * Field no 5
     */
    field5: FormField<T5>,

    /**
     * Field no 6
     */
    field6: FormField<T6>,

    /**
     * Field no 7
     */
    field7: FormField<T7>,

    /**
     * Validates all fields in the form
     * @return Whether any of the fields was an error
     */
    validateAll(): boolean,

    /**
     * Clears the errors of all fields
     */
    clearAllErrors(): void

}

export function useForm7<T1, T2, T3, T4, T5, T6, T7>(arg1: UseFormFieldArgs<T1>, arg2: UseFormFieldArgs<T2>, arg3: UseFormFieldArgs<T3>, arg4: UseFormFieldArgs<T4>, arg5: UseFormFieldArgs<T5>, arg6: UseFormFieldArgs<T6>, arg7: UseFormFieldArgs<T7>): InputForm7<T1, T2, T3, T4, T5, T6, T7> {
    const field1 = useFormField(arg1)
    const field2 = useFormField(arg2)
    const field3 = useFormField(arg3)
    const field4 = useFormField(arg4)
    const field5 = useFormField(arg5)
    const field6 = useFormField(arg6)
    const field7 = useFormField(arg7)

    return {
        field1: field1,
        field2: field2,
        field3: field3,
        field4: field4,
        field5: field5,
        field6: field6,
        field7: field7,
        validateAll() {
            return [field1.validate(), field2.validate(), field3.validate(), field4.validate(), field5.validate(), field6.validate(), field7.validate()]
                .some(x => x)
        },
        clearAllErrors() {
            [field1, field2, field3, field4, field5, field6, field7].forEach(f => f.clearError())
        }
    }
}


/**
 * Represents a form with multiple fields
 */

type InputForm8<T1, T2, T3, T4, T5, T6, T7, T8> = {


    /**
     * Field no 1
     */
    field1: FormField<T1>,

    /**
     * Field no 2
     */
    field2: FormField<T2>,

    /**
     * Field no 3
     */
    field3: FormField<T3>,

    /**
     * Field no 4
     */
    field4: FormField<T4>,

    /**
     * Field no 5
     */
    field5: FormField<T5>,

    /**
     * Field no 6
     */
    field6: FormField<T6>,

    /**
     * Field no 7
     */
    field7: FormField<T7>,

    /**
     * Field no 8
     */
    field8: FormField<T8>,

    /**
     * Validates all fields in the form
     * @return Whether any of the fields was an error
     */
    validateAll(): boolean,

    /**
     * Clears the errors of all fields
     */
    clearAllErrors(): void

}

export function useForm8<T1, T2, T3, T4, T5, T6, T7, T8>(arg1: UseFormFieldArgs<T1>, arg2: UseFormFieldArgs<T2>, arg3: UseFormFieldArgs<T3>, arg4: UseFormFieldArgs<T4>, arg5: UseFormFieldArgs<T5>, arg6: UseFormFieldArgs<T6>, arg7: UseFormFieldArgs<T7>, arg8: UseFormFieldArgs<T8>): InputForm8<T1, T2, T3, T4, T5, T6, T7, T8> {
    const field1 = useFormField(arg1)
    const field2 = useFormField(arg2)
    const field3 = useFormField(arg3)
    const field4 = useFormField(arg4)
    const field5 = useFormField(arg5)
    const field6 = useFormField(arg6)
    const field7 = useFormField(arg7)
    const field8 = useFormField(arg8)

    return {
        field1: field1,
        field2: field2,
        field3: field3,
        field4: field4,
        field5: field5,
        field6: field6,
        field7: field7,
        field8: field8,
        validateAll() {
            return [field1.validate(), field2.validate(), field3.validate(), field4.validate(), field5.validate(), field6.validate(), field7.validate(), field8.validate()]
                .some(x => x)
        },
        clearAllErrors() {
            [field1, field2, field3, field4, field5, field6, field7, field8].forEach(f => f.clearError())
        }
    }
}


/**
 * Represents a form with multiple fields
 */

type InputForm9<T1, T2, T3, T4, T5, T6, T7, T8, T9> = {


    /**
     * Field no 1
     */
    field1: FormField<T1>,

    /**
     * Field no 2
     */
    field2: FormField<T2>,

    /**
     * Field no 3
     */
    field3: FormField<T3>,

    /**
     * Field no 4
     */
    field4: FormField<T4>,

    /**
     * Field no 5
     */
    field5: FormField<T5>,

    /**
     * Field no 6
     */
    field6: FormField<T6>,

    /**
     * Field no 7
     */
    field7: FormField<T7>,

    /**
     * Field no 8
     */
    field8: FormField<T8>,

    /**
     * Field no 9
     */
    field9: FormField<T9>,

    /**
     * Validates all fields in the form
     * @return Whether any of the fields was an error
     */
    validateAll(): boolean,

    /**
     * Clears the errors of all fields
     */
    clearAllErrors(): void

}

export function useForm9<T1, T2, T3, T4, T5, T6, T7, T8, T9>(arg1: UseFormFieldArgs<T1>, arg2: UseFormFieldArgs<T2>, arg3: UseFormFieldArgs<T3>, arg4: UseFormFieldArgs<T4>, arg5: UseFormFieldArgs<T5>, arg6: UseFormFieldArgs<T6>, arg7: UseFormFieldArgs<T7>, arg8: UseFormFieldArgs<T8>, arg9: UseFormFieldArgs<T9>): InputForm9<T1, T2, T3, T4, T5, T6, T7, T8, T9> {
    const field1 = useFormField(arg1)
    const field2 = useFormField(arg2)
    const field3 = useFormField(arg3)
    const field4 = useFormField(arg4)
    const field5 = useFormField(arg5)
    const field6 = useFormField(arg6)
    const field7 = useFormField(arg7)
    const field8 = useFormField(arg8)
    const field9 = useFormField(arg9)

    return {
        field1: field1,
        field2: field2,
        field3: field3,
        field4: field4,
        field5: field5,
        field6: field6,
        field7: field7,
        field8: field8,
        field9: field9,
        validateAll() {
            return [field1.validate(), field2.validate(), field3.validate(), field4.validate(), field5.validate(), field6.validate(), field7.validate(), field8.validate(), field9.validate()]
                .some(x => x)
        },
        clearAllErrors() {
            [field1, field2, field3, field4, field5, field6, field7, field8, field9].forEach(f => f.clearError())
        }
    }
}


/**
 * Represents a form with multiple fields
 */

type InputForm10<T1, T2, T3, T4, T5, T6, T7, T8, T9, T10> = {


    /**
     * Field no 1
     */
    field1: FormField<T1>,

    /**
     * Field no 2
     */
    field2: FormField<T2>,

    /**
     * Field no 3
     */
    field3: FormField<T3>,

    /**
     * Field no 4
     */
    field4: FormField<T4>,

    /**
     * Field no 5
     */
    field5: FormField<T5>,

    /**
     * Field no 6
     */
    field6: FormField<T6>,

    /**
     * Field no 7
     */
    field7: FormField<T7>,

    /**
     * Field no 8
     */
    field8: FormField<T8>,

    /**
     * Field no 9
     */
    field9: FormField<T9>,

    /**
     * Field no 10
     */
    field10: FormField<T10>,

    /**
     * Validates all fields in the form
     * @return Whether any of the fields was an error
     */
    validateAll(): boolean,

    /**
     * Clears the errors of all fields
     */
    clearAllErrors(): void

}

export function useForm10<T1, T2, T3, T4, T5, T6, T7, T8, T9, T10>(arg1: UseFormFieldArgs<T1>, arg2: UseFormFieldArgs<T2>, arg3: UseFormFieldArgs<T3>, arg4: UseFormFieldArgs<T4>, arg5: UseFormFieldArgs<T5>, arg6: UseFormFieldArgs<T6>, arg7: UseFormFieldArgs<T7>, arg8: UseFormFieldArgs<T8>, arg9: UseFormFieldArgs<T9>, arg10: UseFormFieldArgs<T10>): InputForm10<T1, T2, T3, T4, T5, T6, T7, T8, T9, T10> {
    const field1 = useFormField(arg1)
    const field2 = useFormField(arg2)
    const field3 = useFormField(arg3)
    const field4 = useFormField(arg4)
    const field5 = useFormField(arg5)
    const field6 = useFormField(arg6)
    const field7 = useFormField(arg7)
    const field8 = useFormField(arg8)
    const field9 = useFormField(arg9)
    const field10 = useFormField(arg10)

    return {
        field1: field1,
        field2: field2,
        field3: field3,
        field4: field4,
        field5: field5,
        field6: field6,
        field7: field7,
        field8: field8,
        field9: field9,
        field10: field10,
        validateAll() {
            return [field1.validate(), field2.validate(), field3.validate(), field4.validate(), field5.validate(), field6.validate(), field7.validate(), field8.validate(), field9.validate(), field10.validate()]
                .some(x => x)
        },
        clearAllErrors() {
            [field1, field2, field3, field4, field5, field6, field7, field8, field9, field10].forEach(f => f.clearError())
        }
    }
}
    