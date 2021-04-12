import React from 'react';
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import Tooltip from '@material-ui/core/Tooltip';

export default function AddButton({ title, onClick }) {
    return (
        <Tooltip title={title}>
            <Fab size="medium" color="primary" onClick={onClick}>
                <AddIcon />
            </Fab>
        </Tooltip>
    );
}
