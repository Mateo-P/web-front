import { useState, useLayoutEffect } from 'react';
import { useDrop } from 'react-dnd';
import { ItemTypes } from './ItemTypes';
import { Box } from './Box';
import update from 'immutability-helper';
import { makeStyles } from '@material-ui/core/styles';
import MapActions from './MapActions';
import Dialog from 'components/shared/Dialog';
import Createform from 'components/shared/Forms/Createform';
import Deleteform from 'components/shared/Forms/Deleteform';
import { useSnackbar } from 'notistack';
import fetcher from 'shared/fetcher';
import useApi from 'hooks/useApi';
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
    const [{ token }] = useStateValue();
    const [boxes, setBoxes] = useState(null);
    const [selectedTable, setSelectedtable] = useState(null);
    const { revalidate } = useApi('GET', 'restaurants/');

    //TO-DO fetch tables from specific endpoint instead of bringing all with the venue
    //const { payload, isLoading, error } = useApi('GET', 'tables/?venue=${}');

    useLayoutEffect(() => {
        setBoxes(tables);
    }, [tables]);

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
    const deleteBox = async () => {
        let tableId = selectedTable.id;

        delete boxes[tableId];

        handleClose();

        const { error } = await fetcher(`tables/${tableId}/`, 'DELETE', token);

        if (!error) {
            enqueueSnackbar('Mesa eliminada', {
                variant: 'info'
            });
        }
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
    const editNameBox = async () => {
        let tableId = selectedTable.id;

        setBoxes(
            update(boxes, {
                [tableId]: {
                    $merge: { name: formValues.name }
                }
            })
        );
        handleClose();
        setEdit(false);

        const { error } = await fetcher(`tables/${tableId}/`, 'PATCH', token, {
            name: formValues.name
        });

        if (!error) {
            enqueueSnackbar('Mesa actualizada!', {
                variant: 'success'
            });
        }

        revalidate();
    };
    const createBox = async () => {
        let newTable = {
            name: formValues.name,
            top: 20,
            left: 80,
            venue: restaurantId
        };

        //mutate([{ ...restaurant, venues: [...venues, newVenue] }], false);

        handleClose();

        await fetcher('tables/', 'POST', token, newTable);

        revalidate();

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
