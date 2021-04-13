import React, { useState, useEffect } from 'react';
import ItemCrudForm from '../Item/ItemCrudForm';
import { gql, useMutation } from '@apollo/client';
import Item from './Item';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Deleteform from 'components/shared/Forms/Deleteform';
import { useStateValue } from '../../State/StateProvider';
import { GET_USER_MENU } from '../MenuManager/getUserMenu';
import Dialog from 'components/shared/Dialog';
import CancelAcceptButtons from 'components/shared/Dialog/CancelAcceptButtons';
import { validateForm } from '../../shared/utils';

const UPDATE_ITEM_MUTATION = gql`
    mutation updateItemMutation(
        $_id: ID!
        $name: String
        $description: String
        $price: Float
        $image: Upload
        $options: [ItemOptionInput]
    ) {
        updateItem(
            input: {
                _id: $_id
                name: $name
                description: $description
                price: $price
                image: $image
                options: $options
            }
        ) {
            item {
                _id
                name
                description
                category
                price
                image {
                    uri
                    filename
                }
                options {
                    name
                    min
                    max
                    entries {
                        name
                        price
                    }
                }
            }
        }
    }
`;

const DELETE_ITEM_MUTATION = gql`
    mutation deletetemMutation($_id: ID!) {
        deleteItem(input: { _id: $_id }) {
            item {
                _id
            }
        }
    }
`;

export default function ItemEditable(props) {
    const { _id, image, available, availability, handleAvailableChange } = props;
    const [formValues, setFormValues] = useState({});
    const [open, setOpen] = useState(false);
    const [edit, setEdit] = useState(true);
    const [{ user, itemFormFields, item }, dispatch] = useStateValue();

    const [updateItem] = useMutation(UPDATE_ITEM_MUTATION, {
        update: updatecacheItem,
        onCompleted: () => {
            if (item.file) {
                window.location.reload();
            }
        }
    });

    const updatecacheItem = (cache, { data: { updateItem } }) => {
        let email = user.email;
        const userMenu = cache.readQuery({
            query: GET_USER_MENU,
            variables: { email }
        });

        let updatedItem = updateItem.item;

        let newMenu = {
            ...user,
            categories: {
                ...userMenu.user.categories.map((category) =>
                    category.items.map((item) => {
                        if (item._id === updatedItem._id) {
                            return updatedItem;
                        }
                        return item;
                    })
                )
            }
        };

        cache.writeQuery({
            query: GET_USER_MENU,
            variables: {
                email
            },
            data: { user: newMenu }
        });
    };
    const [deleteItem] = useMutation(DELETE_ITEM_MUTATION, {
        update(cache, { data: { deleteItem } }) {
            let email = user.email;
            const userMenu = cache.readQuery({
                query: GET_USER_MENU,
                variables: {
                    email
                }
            });
            let deletedItem = deleteItem.item;
            let newMenu = {
                ...user,
                categories: {
                    ...userMenu.user.categories.map((category) =>
                        category.items.map((item) => item._id !== deletedItem._id)
                    )
                }
            };
            cache.writeQuery({
                query: GET_USER_MENU,
                variables: {
                    email
                },
                data: { user: newMenu }
            });
        }
    });

    useEffect(() => {
        setFormValues({ ...formValues, available: available });
    }, [available]);
    const handleAvailability = (event) => {
        const newAvailableState = !formValues.available;
        if (handleAvailableChange) {
            handleAvailableChange(_id, newAvailableState);
        }

        setFormValues({ ...formValues, [event.target.name]: newAvailableState });
    };

    const updateItemCallback = () => {
        if (validateForm(itemFormFields, item, setItemFieldsError)) {
            let options = item.options?.map(({ name, min, max, entries }) => {
                let newentries = entries.map((ent) => {
                    return { name: ent.name, price: ent.price };
                });
                return {
                    name,
                    entries: newentries,
                    min,
                    max
                };
            });
            updateItem({
                variables: {
                    _id: _id,
                    name: item.name,
                    description: item.description,
                    price: parseFloat(item.price),
                    image: item.file,
                    options
                }
            });
            dispatch({
                type: 'CLEAR_ITEM'
            });
            setOpen(false);
        }
    };
    const setItemFieldsError = (updatedItemFields) => {
        dispatch({
            type: 'SET_FIELDS_ERRORS',
            itemFormFields: updatedItemFields
        });
    };
    const deleteItemCallback = () => {
        deleteItem({
            variables: {
                _id
            }
        });
        setOpen(false);
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

    return (
        <div>
            <Item
                {...props}
                image={image ? image.uri : user.image}
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
                    <ItemCrudForm />
                ) : (
                    <Deleteform message={`Se eliminará ${name} de tus items`} />
                )}
            </Dialog>
        </div>
    );
}
