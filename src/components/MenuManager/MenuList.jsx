import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import ItemEditable from '../Item/ItemEditable';
import Tooltip from '@material-ui/core/Tooltip';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import IconButton from '@material-ui/core/IconButton';
import AddButton from '../shared/AddButton';
import EditAndDeleteMenu from '../shared/EditAndDeleteMenu';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary
    },
    category: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    categoryName: {
        display: 'flex',
        alignItems: 'center'
    },
    categoryActions: {
        display: 'flex'
    },
    buttonActions: {
        padding: theme.spacing(0.5)
    },
    Dropzone: {
        width: '100%',
        marginTop: '15px'
    }
}));

export default function MenuList({
    category,
    position,
    lastCase,
    handleOrder,
    handleOpenCrud,
    editable,
    availability,
    handleAvailableChange
}) {
    const classes = useStyles();
    const { _id, name, items } = category;
    return (
        <>
            <Grid container spacing={3}>
                <Grid className={classes.category} item xs={12}>
                    <div className={classes.categoryActions}>
                        <Typography className={classes.categoryName} variant="h5">
                            {name}
                        </Typography>
                        &nbsp;
                        {editable && position != 0 && (
                            <Tooltip title="Subir categoría">
                                <IconButton
                                    className={classes.buttonActions}
                                    color="secondary"
                                    onClick={() => handleOrder(_id, position - 1)}>
                                    <KeyboardArrowUpIcon fontSize="large" />
                                </IconButton>
                            </Tooltip>
                        )}
                        {editable && !lastCase && (
                            <Tooltip title="Bajar categoría">
                                <IconButton
                                    className={classes.buttonActions}
                                    color="secondary"
                                    onClick={() => handleOrder(_id, position + 1)}>
                                    <KeyboardArrowDownIcon fontSize="large" />
                                </IconButton>
                            </Tooltip>
                        )}
                        {editable && (
                            <EditAndDeleteMenu
                                handleOpenDelete={() => handleOpenCrud(_id, 'DELETE')}
                                handleOpenEdit={() => handleOpenCrud(_id, 'EDIT', name)}
                            />
                        )}
                    </div>
                    {editable && (
                        <AddButton title="Agregar ítem" onClick={() => handleOpenCrud(_id, '')} />
                    )}
                </Grid>
                {items.map((item, i) => (
                    <Grid item xs={12} md={4} key={'g' + i}>
                        <ItemEditable
                            handleAvailableChange={handleAvailableChange}
                            {...item}
                            availability={availability}
                            editable={editable}
                        />
                    </Grid>
                ))}
            </Grid>
        </>
    );
}
