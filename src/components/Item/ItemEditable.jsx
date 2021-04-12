import React, { useState, useEffect } from 'react';
import ItemCrudForm from '../Item/ItemCrudForm';
import Item from './Item';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Deleteform from 'components/shared/Forms/Deleteform';
import { useStateValue } from '../../State/StateProvider';
import Dialog from 'components/shared/Dialog';
import CancelAcceptButtons from 'components/shared/Dialog/CancelAcceptButtons';
import { validateForm } from '../../shared/utils';
import useLogoUri from 'components/shared/useLogoUri';
import { updateItem, deleteItem } from '../MenuManager/Item';
export default function ItemEditable(props) {
    const { id, image, available, availability, handleAvailableChange, not_available_at } = props;
    const [formValues, setFormValues] = useState({});
    const [open, setOpen] = useState(false);
    const [edit, setEdit] = useState(true);
    const [{ itemFormFields, item, token }, dispatch] = useStateValue();

    useEffect(() => {
        setFormValues({ ...formValues, available: available });
    }, [available]);
    const handleAvailability = (event) => {
        const newAvailableState = !formValues.available;
        if (handleAvailableChange) {
            handleAvailableChange({ id, not_available_at }, newAvailableState);
        }

        setFormValues({ ...formValues, [event.target.name]: newAvailableState });
    };

    const updateItemCallback = async () => {
        if (validateForm(itemFormFields, item, setItemFieldsError)) {
            setOpen(false);
            updateItem(item, token);
            dispatch({
                type: 'CLEAR_ITEM'
            });
        }
    };
    const setItemFieldsError = (updatedItemFields) => {
        dispatch({
            type: 'SET_FIELDS_ERRORS',
            itemFormFields: updatedItemFields
        });
    };
    const deleteItemCallback = async () => {
        setOpen(false);
        deleteItem(id, token);
    };

    const handleOpenEdit = () => {
        setOpen(true);
        dispatch({
            type: 'SET_CURRENT_ITEM',
            item: { ...props }
        });
    };

    const handleOpenDelete = () => {
        setEdit(false);
        setOpen(true);
    };

    const availabilitySwitch = (available) => (
        <FormControlLabel
            control={
                <Switch
                    checked={available}
                    onChange={handleAvailability}
                    color="primary"
                    name="available"
                    inputProps={{ 'aria-label': 'primary checkbox' }}
                />
            }
            label="Disponible"
            labelPlacement="start"
        />
    );

    const handleClose = () => {
        setOpen(false);
        setEdit(true);
        dispatch({
            type: 'CLEAR_ITEM'
        });
    };

    const { logoUri } = useLogoUri();

    return (
        <div>
            <Item
                {...props}
                image={image ? image : logoUri}
                availabilitySwitch={
                    availability ? availabilitySwitch(formValues.available) : undefined
                }
                buyable={false}
                handleAvailability={handleAvailability}
                handleOpenEdit={handleOpenEdit}
                handleOpenDelete={handleOpenDelete}
            />
            <Dialog
                open={open}
                onClose={handleClose}
                title={edit ? 'Editar ítem' : 'Eliminar Item'}
                action={
                    <CancelAcceptButtons
                        onCancel={handleClose}
                        onAccept={edit ? updateItemCallback : deleteItemCallback}
                    />
                }>
                {edit ? (
                    <ItemCrudForm edit />
                ) : (
                    <Deleteform message={`Se eliminará ${props.name} de tus items`} />
                )}
            </Dialog>
        </div>
    );
}
