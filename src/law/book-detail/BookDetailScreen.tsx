import {Box, Divider, Paper, Typography} from "@mui/material";
import './BookDetailScreen.css'
import useBookDetailScreen, {BookDetailTab, localizedNameForTab} from "./useBookDetailScreen.ts";
import Book from "../../core/model/Book.ts";
import BookMember from "../../core/model/BookMember.ts";
import Entry from "../../core/model/Entry.ts";
import Section from "../../core/model/Section.ts";
import MOLTabs from "../../core/components/MOLTabs.tsx";
import BookDetailMemberSection from "./component/member-section/BookDetailMemberSection.tsx";
import {MemberRole} from "../../core/model/MemberRole.ts";
import MaybeVisible from "../../core/components/MaybeVisible.tsx";
import BookDetailInvitationSection from "./component/invitation-section/BookDetailInvitationSection.tsx";
import BookDetailContentSection from "./component/content-section/BookDetailContentSection.tsx";
import {useTranslation} from "react-i18next";

/**
 * Content in the sidebar about the book
 * @param props The props
 */
function BookDetailContent(
    props: Readonly<{
        book: Book,
        members: BookMember[],
        entries: Entry[],
        sections: Map<number, Section[]>
    }>
) {
    const {t} = useTranslation()

    const memberCount = props.members.length
    const entryCount = props.entries.length
    const sectionsCount = Array.from(props.sections.values()).flat().length

    return (
        <Box className="book-detail-wrapper">
            <Typography variant={'h4'}>
                {props.book.name}
            </Typography>
            <Typography variant={'body2'} fontWeight={'300'}>
                {props.book.key} | {props.book.id}
            </Typography>
            <Typography variant={'body2'} fontWeight={'300'}>
                {t(
                    'book.detail.children_label',
                    {
                        member_count: memberCount,
                        entry_count: entryCount,
                        section_count: sectionsCount
                    }
                )}
            </Typography>

            <Divider className="book-detail-divider"/>

            <Typography variant={'body1'} fontWeight={'300'}>
                {props.book.description}
            </Typography>
        </Box>
    )
}

/**
 * Screen for the detailed view of a law-book
 */
export default function BookDetailScreen() {
    const {t} = useTranslation()

    const {
        book,
        members,
        entries,
        sections,
        memberRole,
        selectedTab,
        openInvitations,
        selectTab,
        updateUserRole,
        removeUser,
        revokeInvitation
    } = useBookDetailScreen()
    const isDetailLoading = ![book, members, entries, sections].every(p => p.isFinishedSuccess)

    const isMembersLoading = ![members, memberRole, book].every(p => p.isFinishedSuccess)
    const isInvitationsLoading = ![memberRole, openInvitations, book].every(p => p.isFinishedSuccess)
    const isContentLoading = ![entries, sections, memberRole, book].every(p => p.isFinishedSuccess)

    return (
        <Box className="book-detail-screen">

            <Paper elevation={4} className="book-detail-container">
                <MaybeVisible
                    isLoading={isDetailLoading}
                    content={() =>
                        <BookDetailContent
                            book={book.data!}
                            members={members.data!}
                            entries={entries.data!}
                            sections={sections.data!}
                        />
                    }
                />
            </Paper>

            <Box className="book-detail-content">
                <MaybeVisible
                    isLoading={!memberRole.isFinishedSuccess}
                    content={() =>
                        <MOLTabs
                            tabs={[BookDetailTab.Content, BookDetailTab.Members, BookDetailTab.Invitations]}
                            enabled={tab => tab == BookDetailTab.Invitations ? memberRole.data!.valueOf() >= MemberRole.Moderator.valueOf() : true}
                            selected={selectedTab}
                            localizedValueOf={tab => t(localizedNameForTab(tab))}
                            onSelect={selectTab}
                        />
                    }
                />

                <MaybeVisible
                    fullSize={true}
                    isVisible={selectedTab == BookDetailTab.Invitations}
                    isLoading={isInvitationsLoading}
                    content={() =>
                        <BookDetailInvitationSection
                            refreshInvitations={openInvitations.refreshSilent}
                            book={book.data!}
                            invitations={openInvitations.data!}
                            memberRole={memberRole.data!}
                            onRevokeInvitation={revokeInvitation}
                        />
                    }
                />

                <MaybeVisible
                    fullSize={true}
                    isVisible={selectedTab == BookDetailTab.Members}
                    isLoading={isMembersLoading}
                    content={() =>
                        <BookDetailMemberSection
                            members={members.data!}
                            memberRole={memberRole.data!}
                            onChangeRole={updateUserRole}
                            onRemoveMember={removeUser}
                        />
                    }
                />

                <MaybeVisible
                    fullSize={true}
                    isVisible={selectedTab == BookDetailTab.Content}
                    isLoading={isContentLoading}
                    content={() =>
                        <BookDetailContentSection
                            entries={entries.data!}
                            sections={sections.data!}
                            memberRole={memberRole.data!}
                            book={book.data!}
                            refreshEntries={entries.refreshSilent}
                            refreshSections={sections.refreshSilent}
                        />
                    }
                />
            </Box>
        </Box>
    )
}