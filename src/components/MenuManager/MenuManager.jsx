import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import Createform from 'components/shared/Forms/Createform';
import AddIcon from '@material-ui/icons/Add';
import MenuCRUD from './MenuCRUD';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import { GET_USER_MENU } from './getUserMenu';
import { ADD_CATEGORY_MUTATION } from './addCategory';
import PageHeader from '../shared/PageHeader';
import Dialog from 'components/shared/Dialog';
import CancelAcceptButtons from 'components/shared/Dialog/CancelAcceptButtons';
import EmptyItemsMessage from 'components/shared/EmptyItemsMessage';

export default function MenuManager({ user }) {
    const formFields = [{ label: 'Nombre', value: 'name' }];
    const { email } = user;
    const [formValues, setFormValues] = useState({});
    const [open, setOpen] = useState(false);

    const [addCategory] = useMutation(ADD_CATEGORY_MUTATION, {
        update(cache, { data: { addCategory } }) {
            let newCategory = addCategory.category;
            newCategory.items = [];

            let newMenu = {
                __typename: user.__typename,
                categories: [...user.categories, newCategory]
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

    const handleChange = (value) => (e) => {
        setFormValues({ ...formValues, [value]: e.target.value });
    };
    const handleClose = () => {
        setOpen(false);
        setFormValues({});
    };
    const addCallback = () => {
        addCategory({
            variables: {
                name: formValues.name,
                user: email
            }
        });
        setOpen(false);
        setFormValues({});
    };

    return (
        <div>
            <PageHeader
                title="Categorías"
                titleOption={
                    <Tooltip title="Crear categoría">
                        <IconButton color="secondary" onClick={() => setOpen(true)}>
                            <AddIcon fontSize="large" />
                        </IconButton>
                    </Tooltip>
                }
            />
            {user.categories && user.categories.length >= 1 ? (
                <MenuCRUD user={user} />
            ) : (
                <EmptyItemsMessage
                    text={'¡Aún no tienes categorías en tu menú!'}
                    actionLabel="crear mi primera categoría"
                    onAction={() => setOpen(true)}
                />
            )}
            <Dialog
                title={'Crear categoria'}
                open={open}
                onClose={handleClose}
                action={<CancelAcceptButtons onCancel={handleClose} onAccept={addCallback} />}>
                <Createform
                    fields={formFields}
                    handleChange={handleChange}
                    formValues={formValues}
                />
            </Dialog>
        </div>
    );
}
