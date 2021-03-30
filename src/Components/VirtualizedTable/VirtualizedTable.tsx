import { useMemo, useState } from 'react';
import { FixedSizeGrid } from 'react-window';
import './VirtualizedTable.css';
import {readFileSync} from 'fs';
import tableData from "../../data.json"


const Cell = ({ columnIndex, data, rowIndex, style }: any) => {
    const { hoveredRowIndex, setHoveredRowIndex } = data;
    const className = hoveredRowIndex === rowIndex ? 'CellHovered' : 'Cell';

    return (
        <div className={className} onMouseEnter={() => setHoveredRowIndex(rowIndex)} style={style}>
            {tableData[rowIndex].id} {columnIndex}
        </div>
    );
};

export const VirtualizedTable = () => {
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
                width={1100}
            >
                {Cell}
            </FixedSizeGrid>
        </>
    );
};
