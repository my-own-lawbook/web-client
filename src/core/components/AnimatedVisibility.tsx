import {PropsWithChildren} from "react";
import {Box} from "@mui/material";
import './AnimatedVisibility.css'

/**
 * Props for the AnimatedVisibility component
 */
type AnimatedVisibilityProps = {

    /**
     * Whether the children should be visible
     */
    visible: boolean

} & PropsWithChildren

/**
 * Component that animates the content size of the children component
 * @param props The props
 */
export default function AnimatedVisibility(props: AnimatedVisibilityProps) {
    return (
        <Box className={`wrapper ${props.visible ? 'is-open' : ''}`}>
            <Box className="inner">
                {props.children}
            </Box>
        </Box>
    )
}