import Invitation from "../../model/Invitation.ts";
import {Box, ButtonBase, Typography} from "@mui/material";
import './InvitationItem.css'
import {formatName} from "../../formatting/stringFormatting.ts";
import {Trans} from "react-i18next";

/**
 * The props for an invitation item
 */
type InvitationItemProps = {

    /**
     * The invitation
     */
    invitation: Invitation,

    /**
     * The click callback
     */
    onClick: () => void

}

/**
 * A component for an invitation item
 * @param props The props
 */
export default function InvitationItem(props: Readonly<InvitationItemProps>) {
    return (
        <Box className="invitation-item">
            <ButtonBase className="invitation-item-ripple" onClick={props.onClick}>
                <Typography>
                    <Trans
                        i18nKey={'components.invitation_item.label'}
                        values={
                            {
                                user: formatName(props.invitation.author),
                                book: props.invitation.targetBook.name
                            }
                        }
                    >
                        _<b>_</b>_<b>_</b>_
                    </Trans>
                </Typography>
            </ButtonBase>
        </Box>
    )
}