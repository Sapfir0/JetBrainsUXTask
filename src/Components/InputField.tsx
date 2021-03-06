import { IconButton, Input } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import React from 'react';

export interface InputFieldProps {
    onChange: React.ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement>;
    onClose: () => void;
}

export const InputField = (props: InputFieldProps) => {
    return (
        <>
            <Input style={{ marginLeft: 5}} onChange={props.onChange} />
            <IconButton onClick={props.onClose}>
                <CloseIcon />
            </IconButton>
        </>
    );
};
