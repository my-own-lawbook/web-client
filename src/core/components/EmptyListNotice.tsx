import {Link, Typography, useTheme} from "@mui/material";
import './EmptyListNotice.css'

/**
 * Props for the EmptyListNotice component
 */
type EmptyListNoticeProps = {

    /**
     * Text before the clickable text
     */
    preText: string,

    /**
     * Clickable text portion
     */
    clickableText: string,

    /**
     * Callback for when the action text is clicked
     */
    onAction: () => void,

    /**
     * Text after the clickable text
     */
    postText: string

}

/**
 * Component to display information and an action about an empty list
 */
export default function EmptyListNotice(props: Readonly<EmptyListNoticeProps>) {
    const theme = useTheme()

    return (
        <Typography
            variant={"body2"}
            textAlign={"center"}
            color={theme.palette.grey["600"]}
            sx={{
                mt: theme.spacing(2)
            }}
        >
            {props.preText}
            <Link className="clickable-text" onClick={props.onAction}>
                {props.clickableText}
            </Link>
            {props.postText}
        </Typography>
    )
}