import {Box, Divider, Paper, Typography} from "@mui/material";
import './BookDetailScreen.css'
import useBookDetailScreen, {BookDetailTab, localizedNameForTab} from "./useBookDetailScreen.ts";
import Book from "../../core/model/Book.ts";
import BookMember from "../../core/model/BookMember.ts";
import Entry from "../../core/model/Entry.ts";
import Section from "../../core/model/Section.ts";
import Tabs from "../../core/components/Tabs.tsx";
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
        memberState,
        contentState,
        invitationsState,
        detailState,
        memberRole,
        selectedTab,
        selectTab,
        updateUserRole,
        removeUser,
        revokeInvitation
    } = useBookDetailScreen()
    return (
        <Box className="book-detail-screen">

            <Paper elevation={4} className="book-detail-container">
                <MaybeVisible
                    apiResult={detailState}
                    content={state =>
                        <BookDetailContent
                            book={state.book}
                            members={state.members}
                            entries={state.entries}
                            sections={state.sections}
                        />
                    }
                />
            </Paper>

            <Box className="book-detail-content">
                <MaybeVisible
                    apiResult={memberRole}
                    content={state =>
                        <Tabs
                            tabs={[BookDetailTab.Content, BookDetailTab.Members, BookDetailTab.Invitations]}
                            enabled={tab => tab == BookDetailTab.Invitations ? state.valueOf() >= MemberRole.Moderator.valueOf() : true}
                            selected={selectedTab}
                            localizedValueOf={tab => t(localizedNameForTab(tab))}
                            onSelect={selectTab}
                        />
                    }
                />

                <MaybeVisible
                    fullSize={true}
                    isVisible={selectedTab == BookDetailTab.Invitations}
                    apiResult={invitationsState}
                    content={state =>
                        <BookDetailInvitationSection
                            refreshInvitations={invitationsState.refreshSilent}
                            book={state.book}
                            invitations={state.openInvitations}
                            memberRole={state.memberRole}
                            onRevokeInvitation={revokeInvitation}
                        />
                    }
                />

                <MaybeVisible
                    fullSize={true}
                    isVisible={selectedTab == BookDetailTab.Members}
                    apiResult={memberState}
                    content={state =>
                        <BookDetailMemberSection
                            members={state.members}
                            memberRole={state.memberRole}
                            onChangeRole={updateUserRole}
                            onRemoveMember={removeUser}
                        />
                    }
                />

                <MaybeVisible
                    fullSize={true}
                    isVisible={selectedTab == BookDetailTab.Content}
                    apiResult={contentState}
                    content={state =>
                        <BookDetailContentSection
                            entries={state.entries}
                            sections={state.sections}
                            memberRole={state.memberRole}
                            book={state.book}
                            refreshEntries={contentState.refreshSilent}
                            refreshSections={contentState.refreshSilent}
                        />
                    }
                />
            </Box>
        </Box>
    )
}