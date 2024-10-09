import {Box, ButtonBase, Chip, Menu, MenuItem, Stack, Typography, useTheme} from "@mui/material";
import './MOLAppBar.css'
import {useTranslation} from "react-i18next";
import {useAuth} from "../useAuth.ts";
import ValuedMenuState, {useMenuState} from "../states/ValuedMenuState.ts";

/**
 * Props for the MOLAppBar
 */
type MOLAppBarProps = {

    /**
     * Callback for when the user clicks on the logo
     */
    onGoHome: () => void

    /**
     * Callback to log the user out
     */
    onLogout: () => void

    /**
     * Callback to log the user out on all devices
     */
    onLogoutAll: () => void

    /**
     * Callback to take the user to the profile page
     */
    onGoToProfile: () => void

}

/**
 * Component for the user menu
 * @param props The props
 */
function UserMenu(
    props: {
        menuState: ValuedMenuState<void>,
        onProfileClick: () => void,
        onLogoutClick: () => void,
        onLogoutAllClick: () => void
    }
) {
    const {t} = useTranslation()

    return (
        <Menu
            open={props.menuState.isOpen}
            anchorEl={props.menuState.anchor}
            onClose={props.menuState.close}
        >
            <MenuItem onClick={props.onProfileClick}>
                {t('components.app_bar.menu.profile_label')}
            </MenuItem>
            <MenuItem onClick={props.onLogoutClick}>
                {t('components.app_bar.menu.logout_label')}
            </MenuItem>
            <MenuItem onClick={props.onLogoutAllClick}>
                {t('components.app_bar.menu.logout_all_label')}
            </MenuItem>
        </Menu>
    )
}

/**
 * The MOLAppBar
 * @param props The props
 */
export default function MOLAppBar(props: MOLAppBarProps) {
    const auth = useAuth()

    const menuState = useMenuState<void>()

    return (
        <Box
            className="mol-app-bar"
        >
            <HostInformation host={window.location.host}/>
            <Logo onClick={props.onGoHome}/>
            <UserInformation
                email={auth.authenticatedUser?.email ?? ''}
                onClick={e => menuState.open(undefined, e)}
            />

            <UserMenu
                menuState={menuState}
                onProfileClick={props.onGoToProfile}
                onLogoutClick={props.onLogout}
                onLogoutAllClick={props.onLogoutAll}
            />
        </Box>
    )
}

/**
 * Renders an informative section that tells the user about the currently logged in account and gives access to more user-related actions
 * @constructor
 */
function UserInformation(
    props: {
        email: string,
        onClick: (anchor: HTMLElement) => void
    }
) {
    const theme = useTheme()
    const {t} = useTranslation()

    return (
        <ButtonBase
            sx={{
                borderRadius: theme.spacing(1),
                p: 1
            }}
            onClick={(e) => props.onClick(e.currentTarget)}
        >
            <Stack
                direction={"column"}
                alignItems={"start"}
            >
                <Typography>{t('components.app_bar.user.auth_label')}</Typography>
                <Typography fontWeight={600}>
                    {props.email}
                </Typography>
            </Stack>
        </ButtonBase>
    )
}

/**
 * Renders an informative section that informs the user about the host that is currently being used
 */
function HostInformation(
    props: {
        host: string
    }
) {
    const {t} = useTranslation()

    return (
        <Stack
            direction={"row"}
            gap={1}
            alignItems={"center"}
        >
            <Typography>
                {t('components.app_bar.host.host_label')}
            </Typography>
            <Chip
                variant={"filled"}
                label={props.host}
            />
        </Stack>
    )
}

/**
 * The logo component that renders the MOL-Logo
 * @constructor
 */
function Logo(
    props: {
        onClick: () => void
    }
) {
    const {t} = useTranslation()

    return (
        <Stack
            onClick={props.onClick}
            direction={"column"}
            alignItems={"center"}
        >
            <img
                src={"./../../../../Logo.svg"}
                alt={t('components.app_bar.logo.logo_alt')}
                height={"100%"}
            />
        </Stack>
    )
}