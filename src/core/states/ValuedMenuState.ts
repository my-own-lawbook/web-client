import {useState} from "react";

/**
 * State to control a menu bound to a value and an anchor element
 */
type ValuedMenuState<T> = {

    /**
     * The anchor element. Null if is not visible
     */
    anchor: HTMLElement | null,

    /**
     * Whether the menu is open
     */
    isOpen: boolean,

    /**
     * The attached data. Null if the menu has not yet been opened
     */
    data: T | null,

    /**
     * Closes the menu
     */
    close(): void,

    /**
     * Opens the menu and sets the data
     * @param data The data
     * @param anchorElement The element to attach the menu to
     */
    open(data: T, anchorElement: HTMLElement): void

}

export default ValuedMenuState

/**
 * Hook to use a menu element
 */
export const useMenuState = <T>(): ValuedMenuState<T> => {
    const [anchorElement, setAnchorElement] = useState<HTMLElement | null>(null)
    const [data, setData] = useState<T | null>(null)

    return {
        anchor: anchorElement,
        isOpen: anchorElement != null,
        data: data,
        close() {
            setAnchorElement(null)
            setData(null)
        },
        open(data: T, anchorElement: HTMLElement) {
            setData(data)
            setAnchorElement(anchorElement)
        }
    }
}