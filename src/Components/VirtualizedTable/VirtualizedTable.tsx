import React, { useEffect, useState } from 'react';
import { FixedSizeGrid } from 'react-window';
import { reverseDirection } from 'shared/utils';
import { Column, FilterButton, HeadersBaseSettings, SortButton as SortButtonType, SortDirection } from '../../typings';
import { InputField } from '../InputField';
import { SearchButton } from '../SearchButton';
import { SortButton } from '../SortButton';
import './VirtualizedTable.css';
import { VirtualizedTableAction } from './VirtualizedTableAction';

export type VirtualizedTableProps = {
    columns: Column[];
    actions: VirtualizedTableAction;
    state: VirtualizedTableReduxProps
};

export type VirtualizedTableReduxProps = {
    sortBy: string;
    sortDir: SortDirection;
    filterName: string | undefined;
    filterValue: string | undefined;
    data: Subject[];
    originalData: Subject[]
};

export type Subject = {
    id: number
    data1: string
    data2: string
    data3: string
    data4: string
}

export const VirtualizedTable = (props: VirtualizedTableProps) => {
    const [hoveredRowIndex, setHoveredRowIndex] = useState(null);
    const { actions } = props;
    useEffect(() => {
        actions.getList();
    }, [actions]);

    console.log(props);
    
    
    const сolumnWidth = 200;

    const getSortButton = (sortButton: SortButtonType | false | undefined, name: any, handleSortClick: () => void) => {
        const activeButton = name === props.state.sortBy;

        if (sortButton === false) {
            return null;
        }

        if (sortButton === undefined) {
            return (
                <SortButton
                    onClick={handleSortClick}
                    selected={activeButton}
                    direction={activeButton ? props.state.sortDir : 'desc'}
                />
            );
        }

        return sortButton.element(handleSortClick, activeButton, props.state.sortDir);
    };

    const getFilterButton = (
        filterButton: FilterButton | false | undefined,
        name: any,
        onChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
        onClose: () => void,
    ) => {
        const defaultInput = <InputField onClose={onClose} onChange={onChange} />;
        const defaultButton = <SearchButton onClick={() => actions.filterNameChanged(name as string)} />;
        const isActiveButton = name === props.state.filterName;
        if (filterButton === false) {
            // если сказано, что false, то не рендерим компонент
            return null;
        }
        if (filterButton === undefined) {
            // если undefined(просто не инициализировано поле), то рендерим компонент по умолчанию
            return isActiveButton ? defaultInput : defaultButton;
        }

        if (isActiveButton) {
            // если любое из полей не передано, рендерим как дефолтное
            return filterButton.input !== undefined ? filterButton.input(onChange, onClose) : defaultInput;
        } else {
            return filterButton.element !== undefined
                ? filterButton.element(() => actions.filterNameChanged(name as string))
                : defaultButton;
        }
    };

    const renderHeaders = (headerNames: HeadersBaseSettings<any>): React.ReactNode => {
        const headerElements = props.columns.map((header, i) => {
            const filterButton = header.buttons?.filterButton;
            const sortButton = header.buttons?.sortButton;

            const handleSortClick = () => {
                const sortDir = props.state.sortBy === header.text ? reverseDirection(props.state.sortDir) : 'asc' 
                actions.sortDirectionChanged(header.text, sortDir);
            };

            const handleFilterValueChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
                actions.filterValueChanged(event.target.value);
            };

            const onClose = () => {
                actions.filterNameChanged(undefined);
                actions.filterValueChanged(undefined);
            };

            const sortElement = getSortButton(sortButton, header.text, handleSortClick);
            const filterElement = getFilterButton(filterButton, header.text, handleFilterValueChanged, onClose);

            return (
                <div
                    key={header.text.toString()}
                >
                    {header.text}
                    {filterElement}
                    {sortElement}
                </div>
            );
        });

        return <div style={{ display: 'flex', flexDirection: 'row',  zIndex: 1, width: сolumnWidth * headerElements.length, justifyContent: 'space-around' }}>{headerElements}</div>;
    };

    const renderCell = (columns: Column[], records: any[]) => ({ columnIndex, data, rowIndex, style }: any) => {
        const { hoveredRowIndex, setHoveredRowIndex } = data;
        const className = hoveredRowIndex === rowIndex ? 'CellHovered' : 'Cell';
        const columnName = columns[columnIndex].text;

        return (
            <div className={className} onMouseEnter={() => setHoveredRowIndex(rowIndex)} style={style}>
                {props.state.data[rowIndex][columnName]}
            </div>
        );
    };

    const renderBody = (columns: Column[], records: any[]): React.ReactNode => (
        <FixedSizeGrid
            style={{ zIndex: 0 }}
            rowHeight={100}
            columnCount={props.columns.length}
            columnWidth={сolumnWidth}
            height={800}
            itemData={{ hoveredRowIndex, setHoveredRowIndex }}
            rowCount={props.state.data.length}
            width={1100}
        >
            {renderCell(columns, records)}
        </FixedSizeGrid>
    );

    return (
        <>
            {renderHeaders(props.columns as any)}
            {renderBody(props.columns, props.state.data)}
        </>
    );
};
