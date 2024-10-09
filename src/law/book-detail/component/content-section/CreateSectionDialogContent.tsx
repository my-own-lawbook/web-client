import Entry from "../../../../core/model/Entry.ts";
import Section from "../../../../core/model/Section.ts";
import ValuedDialogState from "../../../../core/states/ValuedDialogState.ts";
import useCreateSectionDialogContent from "./useCreateSectionDialogContent.ts";
import {useTranslation} from "react-i18next";
import {Box, Button, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@mui/material";
import {
    SectionContentInput,
    SectionIndexInput,
    SectionNameInput
} from "../../../../core/components/form/SectionInputs.tsx";
import './CreateSectionDialogContent.css'


/**
 * Data type that contains either an entry or a section
 */
export type EntryOrSection = {

    /**
     * The entry
     */
    entry?: Entry,

    /**
     * The section
     */
    section?: Section

}

/**
 * Props for the CreateSectionDialogContent component
 */
type CreateSectionDialogContentProps = {

    /**
     * The dialog state that contains the entry in which the section is created, and optionally the to be edited section
     */
    dialogState: ValuedDialogState<EntryOrSection>,

    /**
     * The callback to refresh the sections
     */
    refreshSections: () => void

}

/**
 * Component that allows a user to create or edit a section
 * @param props The props
 */
export default function CreateSectionDialogContent(props: Readonly<CreateSectionDialogContentProps>) {
    const {t} = useTranslation()

    const {
        indexField,
        nameField,
        contentField,
        onSubmit
    } = useCreateSectionDialogContent(props.dialogState.data!, props.dialogState, props.refreshSections)

    const isCreate = !!props.dialogState.data!.entry
    const keyPrefix = 'book.content.section_dialog' + (isCreate ? '.create' : '.update')

    return (
        <>
            <DialogTitle>{t(`${keyPrefix}.title`)}</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    {t(`${keyPrefix}.description`)}
                </DialogContentText>

                <Box
                    className="index-name-container"
                >
                    <SectionIndexInput field={indexField}/>
                    <SectionNameInput field={nameField}/>
                </Box>
                <SectionContentInput field={contentField}/>

            </DialogContent>
            <DialogActions>
                <Button
                    variant={'contained'}
                    onClick={onSubmit}
                >
                    {t('book.content.section_dialog.submit_button_label')}
                </Button>
            </DialogActions>
        </>
    )
}