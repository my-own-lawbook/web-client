import {Box, Typography} from "@mui/material";
import './SectionDisplay.css'

/**
 * Props for the SectionDisplay
 */
type SectionDisplayProps = {

    /**
     * The title
     */
    title: string,

    /**
     * The description
     */
    description: string

}

/**
 * Component to introduce a new section on the home page with a description
 * @param props The props
 */
export default function SectionDisplay(props: Readonly<SectionDisplayProps>) {
    return (
        <Box className="section-display">
            <Typography className="title" variant={"h2"}>
                {props.title}
            </Typography>

            <Typography className="description" variant={"body1"} fontWeight={100}>
                {props.description}
            </Typography>
        </Box>
    )
}