import {Box, CircularProgress} from "@mui/material";
import {ReactNode} from "react";
import './MaybeVisible.css'
import PendingApiResult from "../model/PendingApiResult.ts";

/**
 * Props for the MaybeVisible component
 */
type MaybeVisibleProps<T> = {

    /**
     * Whether to show anything at all
     */
    isVisible?: boolean,

    /**
     * The api result.
     */
    apiResult: PendingApiResult<T>,

    /**
     * Whether to fill the full size
     */
    fullSize?: boolean,

    /**
     * The lambda that creates the component
     */
    content: (state: T) => ReactNode

}

/**
 * Component to conditionally render another component or a progress indicator
 * @param props The props
 */
export default function MaybeVisible<T>(props: Readonly<MaybeVisibleProps<T>>) {
    if (props.isVisible == false) {
        return null
    }

    return (
        <Box
            sx={props.fullSize ? {height: '100%', width: '100%'} : {}}
        >
            {props.apiResult.isLoading ? (
                <div className="maybe-loading-progress-wrapper">
                    <CircularProgress/>
                </div>
            ) : (
                props.content(props.apiResult.data!)
            )}
        </Box>
    )
}