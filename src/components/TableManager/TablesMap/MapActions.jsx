import React from 'react';
import Tooltip from '@material-ui/core/Tooltip';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    root: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start'
    }
});

function MapActions({ create, deleteBox, editBox }) {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <Tooltip title="Agregar mesa" placement="right">
                <IconButton color="secondary" onClick={create} variant="contained">
                    <AddIcon fontSize="large" />
                </IconButton>
            </Tooltip>
            <Tooltip title="Editar mesa" placement="right">
                <IconButton color="secondary" onClick={editBox}>
                    <EditIcon fontSize="large" />
                </IconButton>
            </Tooltip>
            <Tooltip title="Eliminar mesa" placement="right">
                <IconButton color="secondary" onClick={deleteBox}>
                    <CloseIcon fontSize="large" />
                </IconButton>
            </Tooltip>
        </div>
    );
}

export default MapActions;
