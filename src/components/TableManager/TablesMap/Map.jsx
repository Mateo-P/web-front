import { useState, useLayoutEffect } from 'react';
import { useDrop } from 'react-dnd';
import { ItemTypes } from './ItemTypes';
import { Box } from './Box';
import update from 'immutability-helper';
import { useMutation } from '@apollo/client';
import { makeStyles } from '@material-ui/core/styles';
import MapActions from './MapActions';
import Dialog from 'components/shared/Dialog';
import Createform from 'components/shared/Forms/Createform';
import Deleteform from 'components/shared/Forms/Deleteform';
import { useSnackbar } from 'notistack';
import { GET_USER_RESTAURANTS } from '../../RestaurantsManager/getUserRestaurants';
import { ADD_TABLE } from '../addTable';
import { DELETE_TABLE } from '../deleteTable';
import { useStateValue } from '../../../State/StateProvider';
import CancelAcceptButtons from 'components/shared/Dialog/CancelAcceptButtons';

const useStyles = makeStyles({
    root: {
        marginRight: '8px',
        minWidth: 1200,
        height: 600,
        border: '1px solid #D3D3D3',
        position: 'relative',
        borderRadius: '8px',
        background: '#FFFF'
    }
});

export default function Map({ tables, restaurantId }) {
    const classes = useStyles();
    const formFields = [{ label: 'Nombre', value: 'name' }];
    const [formValues, setFormValues] = useState({});
    const [edit, setEdit] = useState(false);
    const [deleteTable, setDeleteTable] = useState(false);
    const { enqueueSnackbar } = useSnackbar();
    const [openDialog, setOpenDialog] = useState(false);
    const [{ user }] = useStateValue();
    const email = user.email;
    const [boxes, setBoxes] = useState(null);
    const [selectedTable, setSelectedtable] = useState(null);
    useLayoutEffect(() => {
        setBoxes(tables);
    }, [tables]);

    const [deleteTableMutation] = useMutation(DELETE_TABLE, {
        update(cache, { data: { deleteTable } }) {
            const restaurants = cache.readQuery({
                query: GET_USER_RESTAURANTS,
                variables: { email }
            });
            let oldRestaurants = [...restaurants.restaurantsByOwner];

            let { tables } = deleteTable;
            let newRestaurants = oldRestaurants.map((restaurant) => {
                if (restaurant._id === restaurantId) {
                    return { ...restaurant, tables };
                }
                return restaurant;
            });

            cache.writeQuery({
                query: GET_USER_RESTAURANTS,
                variables: {
                    email
                },
                data: { restaurantsByOwner: newRestaurants }
            });
        }
    });
    const [addTable] = useMutation(ADD_TABLE, {
        update(cache, { data: { addTable } }) {
            const restaurants = cache.readQuery({
                query: GET_USER_RESTAURANTS,
                variables: { email }
            });
            let oldRestaurants = [...restaurants.restaurantsByOwner];

            let { table } = addTable;
            let newRestaurants = oldRestaurants.map((restaurant) => {
                let newTables = [...restaurant.tables, table];
                return { ...restaurant, tables: newTables };
            });

            cache.writeQuery({
                query: GET_USER_RESTAURANTS,
                variables: {
                    email
                },
                data: { restaurantsByOwner: newRestaurants }
            });
        }
    });
    const [, drop] = useDrop({
        accept: ItemTypes.BOX,
        drop(item, monitor) {
            const delta = monitor.getDifferenceFromInitialOffset();
            const left = Math.round(item.left + delta.x);
            const top = Math.round(item.top + delta.y);
            moveBox(item.id, left, top);
            return undefined;
        }
    });

    const handleChange = (value) => (e) => {
        setFormValues({ ...formValues, [value]: e.target.value });
    };
    const handleClose = () => {
        setOpenDialog(false);
        setDeleteTable(false);
        setEdit(false);
        setFormValues({});
    };
    const hadleOpenCreate = () => {
        handleClose();
        setOpenDialog(true);
    };
    const hadleOpenEdit = () => {
        setEdit(true);
    };
    const hadleOpenDelete = () => {
        setDeleteTable(true);
    };
    const selectTable = (id, name, top, left) => {
        const table = { id, name, top, left };
        setSelectedtable(table);

        if (edit) {
            setFormValues({
                name
            });
        }
        if (edit || deleteTable) {
            setOpenDialog(true);
        }
    };
    const deleteBox = () => {
        delete boxes[selectedTable.id];
        deleteTableMutation({
            variables: {
                _id: selectedTable.id,
                restaurant: restaurantId
            }
        });
        handleClose();

        enqueueSnackbar('Mesa eliminada', {
            variant: 'error'
        });
    };
    const moveBox = (id, left, top) => {
        setBoxes(
            update(boxes, {
                [id]: {
                    $merge: { left, top }
                }
            })
        );
    };
    const editNameBox = () => {
        setBoxes(
            update(boxes, {
                [selectedTable.id]: {
                    $merge: { name: formValues.name }
                }
            })
        );
        handleClose();
        setEdit(false);
        enqueueSnackbar('Mesa actualizada!', {
            variant: 'success'
        });
    };
    const createBox = () => {
        addTable({
            variables: {
                name: formValues.name,
                top: 20,
                left: 80,
                restaurant: restaurantId
            }
        });
        handleClose();
        enqueueSnackbar('Mesa creada!', {
            variant: 'success'
        });
    };
    return (
        <>
            <div ref={drop} className={classes.root}>
                <MapActions
                    create={hadleOpenCreate}
                    deleteBox={hadleOpenDelete}
                    editBox={hadleOpenEdit}
                />
                {boxes &&
                    Object.keys(boxes).map((key) => {
                        const { left, top, name } = boxes[key];
                        return (
                            <Box
                                edit={edit}
                                key={key}
                                id={key}
                                left={left}
                                top={top}
                                name={name}
                                onSelect={selectTable}
                                hideSourceOnDrag={true}></Box>
                        );
                    })}
            </div>
            <Dialog
                title={deleteTable ? 'Eliminar Mesa' : edit ? 'Editar Mesa' : 'Crear Mesa'}
                open={openDialog}
                onClose={handleClose}
                action={
                    <CancelAcceptButtons
                        onCancel={handleClose}
                        onAccept={deleteTable ? deleteBox : edit ? editNameBox : createBox}
                    />
                }>
                {deleteTable ? (
                    <Deleteform message={`Se eliminará la mesa: ${selectedTable?.name}`} />
                ) : (
                    <Createform
                        fields={formFields}
                        handleChange={handleChange}
                        formValues={formValues}
                    />
                )}
            </Dialog>
        </>
    );
}
