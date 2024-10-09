import {Box, CircularProgress} from "@mui/material";
import {ReactNode} from "react";
import './MaybeVisible.css'

/**
 * Props for the MaybeVisible component
 */
type MaybeVisibleProps = {

    /**
     * Whether to show anything at all
     */
    isVisible?: boolean,

    /**
     * Whether the component is loading.
     */
    isLoading: boolean,

    /**
     * Whether to fill the full size
     */
    fullSize?: boolean,

    /**
     * The lambda that creates the component
     */
    content: () => ReactNode

}

/**
 * Component to conditionally render another component or a progress indicator
 * @param props The props
 */
export default function MaybeVisible(props: MaybeVisibleProps) {
    return (
        props.isVisible == false ? null :
            <Box
                sx={props.fullSize ? {height: '100%', width: '100%'} : {}}
            >
                {props.isLoading ? (
                    <div className="maybe-loading-progress-wrapper">
                        <CircularProgress/>
                    </div>
                ) : (
                    props.content()
                )}
            </Box>
    );
}