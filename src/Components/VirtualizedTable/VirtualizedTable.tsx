import { useMemo, useState } from 'react';
import { FixedSizeGrid } from 'react-window';
import './VirtualizedTable.css';
import { Columns } from '../../typings';
import {Cell} from "../Cell"
import React from 'react';
import { SERVICE_IDENTIFIER } from '../../inversify/inversifyTypes';
import { VirtualizedTableReducer } from './VirtualizedTableReducer';
import { VirtualizedTableAction } from './VirtualizedTableAction';
import { useInject } from '../../shared/hooks/useInject';


type VirtualizedTableProps = {
    columns: Columns
    data: any[]
}


export const VirtualizedTable = (props: VirtualizedTableProps) => {
    const action = useInject<VirtualizedTableAction>(SERVICE_IDENTIFIER.VirtualizedTableAction)
    const reducer = useInject<VirtualizedTableReducer>(SERVICE_IDENTIFIER.VirtualizedTableReducer)

    return (
        <>
            <FixedSizeGrid
                rowHeight={120}
                columnCount={5}
                columnWidth={100}
                height={800}
                itemData={action}
                rowCount={props.data.length}
                width={1100}
            >
                {Cell}
            </FixedSizeGrid>
        </>
    );
};
