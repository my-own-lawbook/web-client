import Entry from "../../model/Entry.ts";
import Section from "../../model/Section.ts";
import {Box, IconButton, Paper, Typography} from "@mui/material";
import './EntryListItem.css'
import {useState} from "react";
import AnimatedVisibility from "../AnimatedVisibility.tsx";
import {ExpandMore, MoreVert} from "@mui/icons-material";

/**
 * Props for the EntryListItem component
 */
type EntryListItemProps = {

    /**
     * The entry
     */
    entry: Entry,

    /**
     * The sections of the entry
     */
    sections: Section[],

    /**
     * Callback for when the settings button is clicked
     * @param HTMLElement The element
     */
    onSettingsClick: (element: HTMLElement) => void,

    /**
     * Callback for when the settings button for a section is clicked
     * @param element The element
     * @param section The section
     */
    onSectionSettingsClick: (element: HTMLElement, section: Section, entry: Entry) => void

}

function SectionItem(
    props: {
        section: Section,
        onSettingsClick: (element: HTMLElement) => void
    }
) {
    return (
        <Box className="section-item">
            <Box className="content-container">
                <Typography className="section-title">{props.section.index} {props.section.name}</Typography>
                <Typography>{props.section.content}</Typography>
            </Box>
            <Box className="icon-container">
                <IconButton
                    className="icon"
                    onClick={e => props.onSettingsClick(e.currentTarget)}
                >
                    <MoreVert/>
                </IconButton>
            </Box>
        </Box>
    )
}

/**
 * Component to display a single entry in a list
 * @param props The props
 */
export default function EntryListItem(props: EntryListItemProps) {
    const [isCollapsed, setIsCollapsed] = useState(false)

    return (
        <Paper elevation={2} className="entry-list-item">
            <Box className="entry-title-container">
                <IconButton
                    onClick={() => setIsCollapsed(!isCollapsed)}
                    disabled={props.sections.length == 0}
                >
                    <ExpandMore className={'collapse-icon-button' + (isCollapsed ? ' collapsed' : '')}/>
                </IconButton>
                <Typography fontWeight="700">{props.entry.key}</Typography>
                <Typography fontWeight="700">-</Typography>
                <Typography className="entry-name">{props.entry.name}</Typography>

                <IconButton
                    onClick={(e) => {
                        props.onSettingsClick(e.currentTarget)
                    }}
                >
                    <MoreVert/>
                </IconButton>
            </Box>

            <AnimatedVisibility visible={isCollapsed}>
                <Box className="section-list">
                    {
                        props.sections.map(section => <SectionItem
                            section={section}
                            onSettingsClick={e => props.onSectionSettingsClick(e, section, props.entry)}
                            key={section.id}
                        />)
                    }
                </Box>
            </AnimatedVisibility>
        </Paper>
    )
}