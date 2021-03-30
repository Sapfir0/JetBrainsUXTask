
export const Cell = ({ columnIndex, data, rowIndex, style }: any) => {
    const { hoveredRowIndex, setHoveredRowIndex } = data;
    const className = hoveredRowIndex === rowIndex ? 'CellHovered' : 'Cell';
    console.log(data)
    return (
        <div className={className} onMouseEnter={() => setHoveredRowIndex(rowIndex)} style={style}>
            {rowIndex} {columnIndex}
        </div>
    );
};
