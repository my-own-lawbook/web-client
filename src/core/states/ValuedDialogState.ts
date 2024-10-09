import {useState} from "react";

/**
 * State to control a dialog that is bound to a specific value
 */
type ValuedDialogState<T> = {

    /**
     * Whether the dialog is opened
     */
    isOpen: boolean,

    /**
     * The current data of the dialog.
     *
     * This is **not** to be used to check whether the dialog is open or not. Before the first opening, this is null. After that, it is only changed when the dialog is opened.
     */
    data: T | null,

    /**
     * Opens the dialog with the specified value
     * @param value
     */
    open(value: T): void,

    /**
     * Closes the dialog
     */
    close(): void

}

export default ValuedDialogState

/**
 * Creates a ValuedDialogState
 * @param initialOpenedState The opened state on the initial load
 */
export const useDialogState = <T>(initialOpenedState: boolean = false): ValuedDialogState<T> => {
    const [isOpen, setIsOpen] = useState(initialOpenedState)
    const [data, setData] = useState<T | null>(null)

    return {
        isOpen,
        data,
        open(value: T) {
            setData(value)
            setIsOpen(true)
        },
        close() {
            setIsOpen(false)
        }
    }
}