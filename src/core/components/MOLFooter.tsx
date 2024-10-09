import {Stack, Typography, useTheme} from "@mui/material";

/**
 * The props for the MOLFooter component
 */
type MOLFooterProps = {

    /**
     * Handles the user clicking on the legal info
     */
    onLegalClick: () => void,

    /**
     * Handles the user clicking on the about info
     */
    onAboutClick: () => void,

    /**
     * Handles the user clicking on the host info
     */
    onHostInfoClick: () => void

}

/**
 * Component for a link in the footer
 * @param props The props
 */
function FooterLink(
    props: {
        onClick: () => void,
        text: string
    }
) {
    const theme = useTheme()

    return (
        <Typography
            color={theme.palette.grey["500"]}

            sx={{
                cursor: "pointer"
            }}

            onClick={props.onClick}
        >
            {props.text}
        </Typography>
    )
}

/**
 * The Footer used in all mol screens
 * @params props The props
 */
export default function MOLFooter(props: MOLFooterProps) {
    const theme = useTheme()

    return (
        <Stack
            direction={"row"}
            sx={{
                width: "100%",
                height: 72,

                justifyContent: "center",
                alignItems: "center",
                gap: 4,
                p: theme.spacing(1),

                borderTop: `${theme.palette.grey["300"]} 1px solid`
            }}
        >
            <FooterLink text={"About MOL"} onClick={props.onAboutClick}/>
            <FooterLink text={"Legal notice"} onClick={props.onLegalClick}/>
            <FooterLink text={"About host"} onClick={props.onHostInfoClick}/>
        </Stack>
    )
}