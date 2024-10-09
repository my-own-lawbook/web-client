import {ReactNode} from "react";
import {Alert, Button, Card, Typography, useTheme} from "@mui/material";
import './AuthFormWrapperCard.css'

/**
 * Props for the component
 */
interface AuthFormWrapperCardProps {

    /**
     * The children
     */
    children?: ReactNode,

    /**
     * The title of the card
     */
    title?: string,

    /**
     * The text of the card
     */
    infoText?: string | ReactNode,

    /**
     * The error text
     */
    errorText?: string,

    /**
     * Text of the confirmation button
     */
    confirmButtonText?: string,

    /**
     * Confirmation action
     */
    onConfirm?: () => unknown

}

/**
 * Card that contains the form for auth actions like login and signup
 * @param props The props of the card
 */
export default function AuthFormWrapperCard(props: Readonly<AuthFormWrapperCardProps>) {
    const theme = useTheme()

    let infoTextContent: JSX.Element | string | null
    if (!props.infoText) {
        infoTextContent = null
    } else if (typeof props.infoText == 'string') {
        infoTextContent = (<Typography variant={'subtitle1'}>{props.infoText}</Typography>)
    } else {
        infoTextContent = props.infoText as JSX.Element
    }

    return (
        <Card
            className="form-card"
            sx={{
                padding: theme.spacing(4),
                gap: theme.spacing(2),
                borderRadius: theme.spacing(2)
            }}>
            {props.title ? <Typography variant={'h4'}>{props.title}</Typography> : null}


            {infoTextContent}

            {props.children}

            {props.errorText ?
                <Alert variant={'standard'} severity={'error'}>{props.errorText}</Alert>
                : null}

            {props.confirmButtonText ?
                <Button variant={'contained'} onClick={props.onConfirm}>{props.confirmButtonText}</Button>
                : null}
        </Card>
    )
}