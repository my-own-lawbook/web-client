import SuccessHandlerProps from "../props/SuccessHandlerProps.ts";
import AuthFormWrapperCard from "../AuthFormWrapperCard.tsx";
import {FirstNameInput, LastNameInput} from "../../../core/components/form/ProfileNameInputs.tsx";
import GenderSelect from "../../../core/components/form/GenderSelect.tsx";
import BirthdayInput from "../../../core/components/form/BirthdayInput.tsx";
import useSetProfile from "./useSetProfile.ts";
import {useTranslation} from "react-i18next";

/**
 * Component for the auth card that lets a user design their profile
 */
export default function SetProfileCard(props: SuccessHandlerProps) {
    const {t} = useTranslation()
    const {state, onSubmit} = useSetProfile(props.onSuccess)

    return (
        <AuthFormWrapperCard
            title={t('auth.profile.card.title')}
            infoText={t('auth.profile.card.description')}
            confirmButtonText={t('auth.profile.card.confirm_button_label')}
            onConfirm={onSubmit}
            errorText={state.isError ? "An error occurred. Please refresh the site." : undefined}>

            <FirstNameInput
                autoFocus
                required
                field={state.firstName}
            />

            <LastNameInput
                required
                field={state.lastName}
            />

            <GenderSelect
                required
                field={state.gender}
            />

            <BirthdayInput
                field={state.birthday}
            />

        </AuthFormWrapperCard>
    )
}