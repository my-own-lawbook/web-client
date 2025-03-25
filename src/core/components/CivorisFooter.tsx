import {Link, Stack, useTheme} from "@mui/material";

/**
 * Component for a link in the footer
 * @param props The props
 */
function FooterLink(
    props: Readonly<{
        link: string | null,
        text: string
    }>
) {
    const theme = useTheme()

    if (props.link == null) {
        return null
    } else {
        return (
            <Link
                href={props.link}
                color={theme.palette.grey["500"]}
                sx={{
                    cursor: "pointer"
                }}
            >
                {props.text}
            </Link>
        )
    }
}

const GITHUB_LINK = "https://github.com/civoris/web-client"

/**
 * The Footer used in all civoris screens
 * @params props The props
 */
export default function CivorisFooter() {
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

            <FooterLink text={"About Civoris"} link={GITHUB_LINK}/>
            <FooterLink text={"Legal notice"} link={window.__APP_CONFIG__?.VITE_API_URL ?? ""}/>
            <FooterLink text={"About host"} link={window.__APP_CONFIG__?.VITE_API_URL ?? ""}/>
        </Stack>
    )
}