import React from 'react';
import AddButton from '../../shared/AddButton';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: theme.spacing(1)
    }
}));

export default function ItemOptionsHeader({ handleCreateOption }) {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Typography variant="h5">Opciones para ordenar</Typography>
            <AddButton title="Agregar opción" onClick={() => handleCreateOption()} />
        </div>
    );
}
