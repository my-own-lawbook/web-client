import {PropsWithChildren, ReactNode} from "react";
import {Box, Typography} from "@mui/material";
import './DataGrid.css'

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
 * Props for the DataGrid component
 */
type DataGridProps<T extends HasId> = {

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
type DataGridHeaderItemProps = {

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
export function DataGridHeaderItem(props: Readonly<DataGridHeaderItemProps>) {
    return (
        <Box className="data-grid-header-item">
            {props.icon ? props.icon : null}
            <Typography>{props.label}</Typography>
        </Box>
    )
}

function DataGridSection(props: Readonly<PropsWithChildren>) {
    return (
        <Box className="data-grid-section" children={props.children}/>
    )
}

function DataGridRow(props: Readonly<PropsWithChildren>) {
    return (
        <Box className="data-grid-row" children={props.children}/>
    )
}

/**
 * Component to structure an array of items in a grid-way
 * @param props The props
 */
export default function DataGrid<T extends HasId>(props: Readonly<DataGridProps<T>>) {
    const rowNodes = props.items.map(item => {
        return {nodes: props.rowNodes(item), id: item.id}
    })
    const rows = rowNodes.map(rns => {
        const sections = rns.nodes.map(node => {
            return <DataGridSection children={node.node} key={node.fieldName}/>
        })
        return <DataGridRow children={sections} key={rns.id}/>
    })

    // noinspection com.intellij.reactbuddy.ArrayToJSXMapInspection
    return (
        <Box className="data-grid">
            <DataGridRow
            >
                {props.headerNodes.map(headerNode => <DataGridSection children={headerNode.node}
                                                                                  key={headerNode.id}/>)}
            </DataGridRow>

            {rows}
        </Box>
    )
}