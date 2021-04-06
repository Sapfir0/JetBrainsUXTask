import { table } from 'node:console'
import { createSelector } from 'reselect'
import { VirtualizedTableReduxProps } from './VirtualizedTable'



const getState = ({filterName, filterValue, sortBy,  sortDir}: VirtualizedTableReduxProps) => {
    return {filterName, filterValue, sortBy, sortDir }
}

const getData = ({data, originalData}: VirtualizedTableReduxProps) => {
    return {data, originalData}
}

export const makeTableState = () => {
    return createSelector(
        [ getState, getData ],
        (params, tableData) => {
            
            return {...params, ...tableData}
        }
    )
}

