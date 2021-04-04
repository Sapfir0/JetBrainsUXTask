import { IconButton } from '@material-ui/core';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import React, { MouseEventHandler } from 'react';
import { SortDirection } from '../typings';

export interface SortButtonProps {
    onClick: MouseEventHandler;
    selected: boolean;
    direction: SortDirection;
}

export const SortButton = (props: SortButtonProps): React.ReactElement => {    
    return (
        <IconButton onClick={props.onClick}>
            {props.direction === 'desc' ? <ArrowDownwardIcon /> : <ArrowUpwardIcon />}
        </IconButton>
    );

};
