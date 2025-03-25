import {Box, Typography, useTheme} from "@mui/material";
import './SectionDisplay.css'
import {ReactNode} from "react";

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
 * Props for the SectionDisplay with child instead of a description.
 */
type SectionDisplayPropsChildren = {

    /**
     * The title
     */
    title: string,

    /**
     * The child node
     */
    children: ReactNode

}

/**
 * Base section display that allows passing a custom child
 * @param props The props
 */
export function BaseSectionDisplay(props: Readonly<SectionDisplayPropsChildren>) {
    return (
        <Box className="section-display">
            <Typography className="title" variant={"h2"}>
                {props.title}
            </Typography>

            {props.children}
        </Box>
    )
}

/**
 * Component to introduce a new section on the home page with a description
 * @param props The props
 */
export default function SectionDisplay(props: Readonly<SectionDisplayProps>) {
    const theme = useTheme()

    return (
        <BaseSectionDisplay
            title={props.title}>
            <Typography
                variant={"body2"}
                color={theme.palette.grey["600"]}
            >
                {props.description}
            </Typography>
        </BaseSectionDisplay>
    )
}