import {ButtonBase, Paper, Typography} from "@mui/material";
import './MOLTabs.css'

/**
 * Props for the MOLTabs component
 */
type MOLTabsProps<T> = {

    /**
     * The possible tab destinations
     */
    tabs: T[],

    /**
     * Whether a specific tab is enabled
     */
    enabled?: (tab: T) => boolean,

    /**
     * The selected tab
     */
    selected: T | null,

    /**
     * Gets the localized value of a tab type
     * @param T The type
     */
    localizedValueOf: (value: T) => string,

    /**
     * Callback for tab selection
     * @param T The selected tab
     */
    onSelect: (value: T) => void

}

function MOLTab(
    props: {
        display: string,
        selected: boolean,
        onSelect: () => void,
        enabled: boolean
    }
) {
    let className = props.selected ? "tab tab-selected" : "tab"
    className = props.enabled ? className : className + " tab-disabled"

    return (
        <ButtonBase className={className} onClick={props.enabled ? props.onSelect : () => {
        }} disabled={!props.enabled}>
            <Typography
                variant={'body2'}
            >
                {props.display}
            </Typography>
        </ButtonBase>
    )
}

/**
 * Component for displaying a lightweight tab row
 * @param props The props
 */
export default function MOLTabs<T>(props: MOLTabsProps<T>) {
    return (
        <Paper elevation={4} className="tabs">
            {props.tabs.map((tab, index) => {
                return <MOLTab
                    key={index}
                    selected={tab == props.selected}
                    display={props.localizedValueOf(tab)}
                    onSelect={() => props.onSelect(tab)}
                    enabled={props.enabled ? props.enabled(tab) : true}
                />
            })}
        </Paper>
    )
}