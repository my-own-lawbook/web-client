import {PropsWithChildren, ReactNode} from "react";
import {Box, Typography} from "@mui/material";
import './MOLDataGrid.css'

/**
 * Defines attributes needed for an item
 */
interface HasId {

    /**
     * The id
     */
    id: number | string

}

/**
 * Props for the MOLDataGrid component
 */
type MOLDataGridProps<T extends HasId> = {

    /**
     *
     */
    headerNodes: { node: ReactNode, id: string | number }[]

    /**
     * The items
     */
    items: T[],

    /**
     * Callback to create a list of nodes for one value
     * @param value The value
     */
    rowNodes: (value: T) => { node: ReactNode, fieldName: string }[]

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
export function MOLDataGridHeaderItem(props: Readonly<MOLDataGridHeaderItemProps>) {
    return (
        <Box className="data-grid-header-item">
            {props.icon ? props.icon : null}
            <Typography>{props.label}</Typography>
        </Box>
    )
}

function MOLDataGridSection(props: Readonly<PropsWithChildren>) {
    return (
        <Box className="data-grid-section" children={props.children}/>
    )
}

function MOLDataGridRow(props: Readonly<PropsWithChildren>) {
    return (
        <Box className="data-grid-row" children={props.children}/>
    )
}

/**
 * Component to structure an array of items in a grid-way
 * @param props The props
 */
export default function MOLDataGrid<T extends HasId>(props: Readonly<MOLDataGridProps<T>>) {
    const rowNodes = props.items.map(item => {
        return {nodes: props.rowNodes(item), id: item.id}
    })
    const rows = rowNodes.map(rns => {
        const sections = rns.nodes.map(node => {
            return <MOLDataGridSection children={node.node} key={node.fieldName}/>
        })
        return <MOLDataGridRow children={sections} key={rns.id}/>
    })

    // noinspection com.intellij.reactbuddy.ArrayToJSXMapInspection
    return (
        <Box className="data-grid">
            <MOLDataGridRow
            >
                {props.headerNodes.map((headerNode, index) => <MOLDataGridSection children={headerNode.node}
                                                                                  key={headerNode.id}/>)}
            </MOLDataGridRow>

            {rows}
        </Box>
    )
}