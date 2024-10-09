import Entry from "../../../../core/model/Entry.ts";
import Section from "../../../../core/model/Section.ts";
import {Box, Button, Menu, MenuItem} from "@mui/material";
import './BookDetailContentSection.css'
import EntryListItem from "../../../../core/components/entry/EntryListItem.tsx";
import {MemberRole} from "../../../../core/model/MemberRole.ts";
import {useTranslation} from "react-i18next";
import EmptyListNotice from "../../../../core/components/EmptyListNotice.tsx";
import MOLDialog from "../../../../core/components/dialog/MOLDialog.tsx";
import CreateEntryDialogContent from "./CreateEntryDialogContent.tsx";
import ValuedDialogState from "../../../../core/states/ValuedDialogState.ts";
import Book from "../../../../core/model/Book.ts";
import ValuedMenuState from "../../../../core/states/ValuedMenuState.ts";
import DeleteConfirmationDialog from "../../../../core/components/dialog/DeleteConfirmationDialog.tsx";
import useBookDetailContentSection from "./useBookDetailContentSection.ts";
import CreateSectionDialogContent from "./CreateSectionDialogContent.tsx";

/**
 * Props for the BookDetailContentSection component
 */
type BookDetailContentSectionProps = {

    /**
     * The entries of the book
     */
    entries: Entry[],

    /**
     * The sections of the book
     */
    sections: Map<number, Section[]>,

    /**
     * Role of the user
     */
    memberRole: MemberRole,

    /**
     * The book
     */
    book: Book,

    /**
     * Callback to refresh the list of entries
     */
    refreshEntries: () => void,

    /**
     * Callback to refresh the list of sections
     */
    refreshSections: () => void

}

/**
 * Notice for when no entries are present. Differentiates between admins and non-admins
 * @param props The props
 */
function NoEntriesNotice(
    props: {
        memberRole: MemberRole,
        onAction: () => void
    }
) {
    const {t} = useTranslation()

    return (
        props.memberRole == MemberRole.Admin ?
            <EmptyListNotice
                preText={t('book.content.empty_list.admin.pre')}
                clickableText={t('book.content.empty_list.admin.action')}
                postText={t('book.content.empty_list.admin.post')}
                onAction={props.onAction}
            />
            : <EmptyListNotice
                preText={t('book.content.empty_list.generic.pre')}
                clickableText={t('book.content.empty_list.generic.action')}
                postText={t('book.content.empty_list.generic.post')}
                onAction={props.onAction}
            />

    )
}

/**
 * Component for the entry settings menu
 * @param props The props
 */
function EntrySettingsMenu(
    props: {
        menuState: ValuedMenuState<Entry>,
        onAddSectionClick: () => void,
        onEditClick: () => void,
        onDeleteClick: () => void,
        memberRole: MemberRole
    }
) {
    const {t} = useTranslation()

    return (
        <Menu
            open={props.menuState.isOpen}
            anchorEl={props.menuState.anchor}
            onClose={props.menuState.close}
        >
            <MenuItem
                onClick={props.onAddSectionClick}
                disabled={props.memberRole == MemberRole.Member}
            >
                {t('book.content.entry_menu.add_section_label')}
            </MenuItem>
            <MenuItem
                onClick={props.onEditClick}
                disabled={props.memberRole == MemberRole.Member}
            >
                {t('book.content.entry_menu.edit_label')}
            </MenuItem>
            <MenuItem
                onClick={props.onDeleteClick}
                disabled={props.memberRole == MemberRole.Member}
            >
                {t('book.content.entry_menu.delete_label')}
            </MenuItem>
        </Menu>
    )
}

/**
 * Component for the section settings menu
 * @param props The props
 */
function SectionSettingsMenu(
    props: {
        menuState: ValuedMenuState<Section>,
        onEditClick: () => void,
        onDeleteClick: () => void,
        memberRole: MemberRole
    }
) {
    const {t} = useTranslation()

    return (
        <Menu
            open={props.menuState.isOpen}
            anchorEl={props.menuState.anchor}
            onClose={props.menuState.close}
        >
            <MenuItem
                onClick={props.onEditClick}
                disabled={props.memberRole == MemberRole.Member}
            >
                {t('book.content.section_menu.edit_label')}
            </MenuItem>
            <MenuItem
                onClick={props.onDeleteClick}
                disabled={props.memberRole == MemberRole.Member}
            >
                {t('book.content.section_menu.delete_label')}
            </MenuItem>
        </Menu>
    )
}

/**
 * Component that shows a dialog to confirm the deletion of an entry
 * @param props The props
 */
function DeleteEntryConfirmationDialog(
    props: {
        onConfirm: () => void,
        dialogState: ValuedDialogState<Entry>
    }
) {
    const {t} = useTranslation()

    return (
        <DeleteConfirmationDialog
            onConfirm={props.onConfirm}
            dialogState={props.dialogState}
            identifier={v => v.name}
            elementName={t('book.content.entry_delete_dialog_type')}
        />
    )
}

/**
 * Component that shows a dialog to confirm the deletion of a section
 * @param props The props
 */
function DeleteSectionConfirmationDialog(
    props: {
        onConfirm: () => void,
        dialogState: ValuedDialogState<Section>
    }
) {
    const {t} = useTranslation()

    return (
        <DeleteConfirmationDialog
            onConfirm={props.onConfirm}
            dialogState={props.dialogState}
            identifier={v => v.name}
            elementName={t('book.content.section_delete_dialog_type')}
        />
    )
}

/**
 * Component for the section that displays the actual contents of a law-book
 * @param props The props
 */
export default function BookDetailContentSection(props: BookDetailContentSectionProps) {
    const {t} = useTranslation()

    const {
        entryMenuState,
        sectionMenuState,
        createEntryDialogState,
        createSectionDialogState,
        deleteEntryDialogState,
        deleteSectionDialogState,
        onOpenEntryMenu,
        onOpenSectionMenu,
        onOpenCreateEntryDialog,
        onOpenEditEntryDialog,
        onOpenCreateSectionDialog,
        onOpenEditSectionDialog,
        onOpenDeleteEntryDialog,
        onOpenDeleteSectionDialog,
        onDeleteEntry,
        onDeleteSection
    } = useBookDetailContentSection(props.book, props.refreshEntries, props.refreshSections)

    return (
        <Box>
            <Box className="entry-list">
                {props.entries.map(entry =>
                    <EntryListItem
                        entry={entry}
                        sections={props.sections.get(entry.id) ?? []}
                        key={entry.id}
                        onSettingsClick={e => onOpenEntryMenu(e, entry)}
                        onSectionSettingsClick={onOpenSectionMenu}
                    />
                )}
            </Box>

            {props.entries.length == 0 ?
                <NoEntriesNotice
                    memberRole={props.memberRole}
                    onAction={onOpenCreateEntryDialog}
                />
                : null}

            {props.entries.length != 0 ?
                <Box className="create-entry-button-container">
                    <Button
                        variant={'contained'}
                        disabled={props.memberRole == MemberRole.Member}
                        onClick={onOpenCreateEntryDialog}
                    >
                        {t('book.content.create_entry_button_label')}
                    </Button>
                </Box>
                : null}

            {/*
              * Modal dialogs and menus
              */}

            <MOLDialog
                dialogState={createEntryDialogState}
            >
                <CreateEntryDialogContent
                    dialogState={createEntryDialogState}
                    refreshEntries={props.refreshEntries}
                />
            </MOLDialog>

            <MOLDialog
                dialogState={createSectionDialogState}
            >
                <CreateSectionDialogContent
                    dialogState={createSectionDialogState}
                    refreshSections={props.refreshSections}
                />
            </MOLDialog>

            <EntrySettingsMenu
                menuState={entryMenuState}
                onAddSectionClick={onOpenCreateSectionDialog}
                onEditClick={onOpenEditEntryDialog}
                onDeleteClick={onOpenDeleteEntryDialog}
                memberRole={props.memberRole}
            />

            <SectionSettingsMenu
                menuState={sectionMenuState}
                onEditClick={onOpenEditSectionDialog}
                onDeleteClick={onOpenDeleteSectionDialog}
                memberRole={props.memberRole}
            />

            <DeleteEntryConfirmationDialog
                onConfirm={onDeleteEntry}
                dialogState={deleteEntryDialogState}
            />
            <DeleteSectionConfirmationDialog
                onConfirm={onDeleteSection}
                dialogState={deleteSectionDialogState}
            />
        </Box>
    )
}