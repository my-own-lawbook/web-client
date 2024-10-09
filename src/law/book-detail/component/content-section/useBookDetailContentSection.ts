import ValuedMenuState, {useMenuState} from "../../../../core/states/ValuedMenuState.ts";
import Entry from "../../../../core/model/Entry.ts";
import ValuedDialogState, {useDialogState} from "../../../../core/states/ValuedDialogState.ts";
import Book from "../../../../core/model/Book.ts";
import {BookOrEntry} from "./CreateEntryDialogContent.tsx";
import {deleteEntryApiCall, deleteSectionApiCall} from "../../../../core/network/lawCalls.ts";
import {EntryOrSection} from "./CreateSectionDialogContent.tsx";
import Section from "../../../../core/model/Section.ts";

/**
 * Type of the useBookDetailContentSection hook
 */
type UseBookDetailContentSection = {

    /**
     * The menu state for the entry settings menu
     */
    entryMenuState: ValuedMenuState<Entry>,

    /**
     * The menu state for the section settings menu
     */
    sectionMenuState: ValuedMenuState<Section>,

    /**
     * The dialog state for the create entry dialog
     */
    createEntryDialogState: ValuedDialogState<BookOrEntry>,

    /**
     * The dialog state for the create section dialog
     */
    createSectionDialogState: ValuedDialogState<EntryOrSection>,

    /**
     * The dialog state for the delete entry dialog
     */
    deleteEntryDialogState: ValuedDialogState<Entry>,

    /**
     * The dialog state for the section delete dialog
     */
    deleteSectionDialogState: ValuedDialogState<Section>,

    /**
     * Callback when the entry menu should be opened
     * @param anchor The anchor element
     * @param entry The associated entry
     */
    onOpenEntryMenu: (anchor: HTMLElement, entry: Entry) => void,

    /**
     * Callback when the section menu should be opened
     * @param anchor The anchor element
     * @param section The section
     */
    onOpenSectionMenu: (anchor: HTMLElement, section: Section) => void,

    /**
     * Callback when the create entry dialog should be opened
     * @param entry
     */
    onOpenCreateEntryDialog: () => void,

    /**
     * Callback when the edit entry dialog should be opened
     * @param entry
     */
    onOpenEditEntryDialog: () => void,

    /**
     * Callback when the create section dialog should be opened
     */
    onOpenCreateSectionDialog: () => void,

    /**
     * Callback when the edit section dialog should be opened
     */
    onOpenEditSectionDialog: () => void,

    /**
     * Callback when the delete entry dialog should be opened
     * @param entry The entry
     */
    onOpenDeleteEntryDialog: () => void,

    /**
     * Callback when the delete section dialog should be opened
     */
    onOpenDeleteSectionDialog: () => void,

    /**
     * Callback when an entry should be deleted
     * @param entry
     */
    onDeleteEntry: () => Promise<void>,

    /**
     * Callback when the section from the section delete dialog should be deleted
     */
    onDeleteSection: () => Promise<void>

}

/**
 * Hook for the BookDetailContentSection
 */
const useBookDetailContentSection = (
    book: Book,
    refreshEntries: () => void,
    refreshSections: () => void
): UseBookDetailContentSection => {
    const entryMenuState = useMenuState<Entry>()
    const sectionMenuState = useMenuState<Section>()

    const createEntryDialogState = useDialogState<BookOrEntry>()
    const createSectionDialogState = useDialogState<EntryOrSection>()
    const deleteEntryDialogState = useDialogState<Entry>()
    const deleteSectionDialogState = useDialogState<Section>()

    return {
        entryMenuState,
        sectionMenuState,
        createEntryDialogState,
        createSectionDialogState,
        deleteEntryDialogState,
        deleteSectionDialogState,
        onOpenEntryMenu(anchor: HTMLElement, entry: Entry) {
            entryMenuState.open(entry, anchor)
        },
        onOpenSectionMenu(anchor: HTMLElement, section: Section) {
            sectionMenuState.open(section, anchor)
        },
        onOpenCreateEntryDialog() {
            createEntryDialogState.open({book: book})
            entryMenuState.close()
        },
        onOpenEditEntryDialog() {
            createEntryDialogState.open({book: book, entry: entryMenuState.data!})
            entryMenuState.close()
        },
        onOpenCreateSectionDialog() {
            createSectionDialogState.open({entry: entryMenuState.data!})
            entryMenuState.close()
        },
        onOpenEditSectionDialog() {
            createSectionDialogState.open({section: sectionMenuState.data!})
            sectionMenuState.close()
        },
        onOpenDeleteEntryDialog() {
            deleteEntryDialogState.open(entryMenuState.data!)
            entryMenuState.close()
        },
        onOpenDeleteSectionDialog() {
            deleteSectionDialogState.open(sectionMenuState.data!)
            sectionMenuState.close()
        },
        async onDeleteEntry() {
            await deleteEntryApiCall(deleteEntryDialogState.data!.id)
            refreshEntries()
            deleteEntryDialogState.close()
        },
        async onDeleteSection() {
            await deleteSectionApiCall(deleteSectionDialogState.data!.id)
            refreshSections()
            deleteSectionDialogState.close()
        }
    }
}

export default useBookDetailContentSection