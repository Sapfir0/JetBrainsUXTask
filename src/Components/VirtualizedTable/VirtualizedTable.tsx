import { useMemo, useState } from 'react';
import { FixedSizeGrid } from 'react-window';
import './VirtualizedTable.css';
import tableData from "../../data.json"
import { Columns } from '../../typings';


const Cell = ({ columnIndex, data, rowIndex, style }: any) => {
    const { hoveredRowIndex, setHoveredRowIndex } = data;
    const className = hoveredRowIndex === rowIndex ? 'CellHovered' : 'Cell';
    console.log(data)
    return (
        <div className={className} onMouseEnter={() => setHoveredRowIndex(rowIndex)} style={style}>
            {rowIndex} {columnIndex}
            {/* {tableData[rowIndex][`data${columnIndex}` as any] as any} */}
        </div>
    );
};

type VirtualizedTableProps = {
    columns: Columns
}

export const VirtualizedTable = (props: VirtualizedTableProps) => {
    const [hoveredRowIndex, setHoveredRowIndex] = useState(null);
    const itemData = useMemo(
        () => ({
            hoveredRowIndex,
            setHoveredRowIndex,
        }),
        [hoveredRowIndex],
    );

    return (
        <>
            <FixedSizeGrid
                rowHeight={120}
                columnCount={5}
                columnWidth={100}
                height={800}
                itemData={itemData}
                rowCount={tableData.length}
                // rowCount={50000}
                width={1100}
            >
                {Cell}
            </FixedSizeGrid>
        </>
    );
};
