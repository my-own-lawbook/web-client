import {PropsWithChildren, ReactNode} from "react";
import {Box, Typography} from "@mui/material";
import './MOLDataGrid.css'

/**
 * Props for the MOLDataGrid component
 */
type MOLDataGridProps<T> = {

    /**
     *
     */
    headerNodes: ReactNode[]

    /**
     * The items
     */
    items: T[],

    /**
     * Callback to create a list of nodes for one value
     * @param value The value
     */
    rowNodes: (value: T) => ReactNode[],

    /**
     * Alternative text to display if there are no items
     */
    altText?: string

}

/**
 * Props for a header item
 */
type MOLDataGridHeaderItemProps = {

    /**
     * The label
     */
    label: string

    /**
     * The icon
     */
    icon?: ReactNode

}

/**
 * Component for a single header item in the header row of a data grid
 * @param props The props
 */
export function MOLDataGridHeaderItem(props: MOLDataGridHeaderItemProps) {
    return (
        <Box className="data-grid-header-item">
            {props.icon ? props.icon : null}
            <Typography>{props.label}</Typography>
        </Box>
    )
}

function MOLDataGridSection(props: PropsWithChildren) {
    return (
        <Box className="data-grid-section" children={props.children}/>
    )
}

function MOLDataGridRow(props: PropsWithChildren) {
    return (
        <Box className="data-grid-row" children={props.children}/>
    )
}

/**
 * Component to structure an array of items in a grid-way
 * @param props The props
 */
export default function MOLDataGrid<T>(props: MOLDataGridProps<T>) {
    const rowNodes = props.items.map(item => {
        return props.rowNodes(item)
    })
    const rows = rowNodes.map((rns, index) => {
        const sections = rns.map((node, index) => {
            return <MOLDataGridSection children={node} key={index}/>
        })
        return <MOLDataGridRow children={sections} key={index}/>
    })

    // noinspection com.intellij.reactbuddy.ArrayToJSXMapInspection
    return (
        <Box className="data-grid">
            <MOLDataGridRow
            >
                {props.headerNodes.map((headerNode, index) => <MOLDataGridSection children={headerNode} key={index}/>)}
            </MOLDataGridRow>

            {rows}
        </Box>
    )
}