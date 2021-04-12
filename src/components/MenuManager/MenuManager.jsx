import React, { useState } from 'react';
import Createform from 'components/shared/Forms/Createform';
import AddIcon from '@material-ui/icons/Add';
import MenuCRUD from './MenuCRUD';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import PageHeader from '../shared/PageHeader';
import Dialog from 'components/shared/Dialog';
import CancelAcceptButtons from 'components/shared/Dialog/CancelAcceptButtons';
import EmptyItemsMessage from 'components/shared/EmptyItemsMessage';
import useApi from 'hooks/useApi';
import { useStateValue } from 'State/StateProvider';
import { createCategory } from './Category';
export default function MenuManager() {
    const formFields = [{ label: 'Nombre', value: 'name' }];
    const [formValues, setFormValues] = useState({});
    const [open, setOpen] = useState(false);
    const { payload: categories, error, isLoading, mutate } = useApi('GET', 'menu/');
    const [{ token }] = useStateValue();
    console.log(categories);
    const handleChange = (value) => (e) => {
        setFormValues({ ...formValues, [value]: e.target.value });
    };
    const handleClose = () => {
        setOpen(false);
        setFormValues({});
    };
    const addCategoryCallback = async () => {
        setOpen(false);
        setFormValues({});
        const newCategory = { name: formValues.name, items: [] };
        createCategory(newCategory, token, mutate);
    };

    if (error) return `Error! ${error.message}`;

    return (
        <>
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
            {isLoading ? (
                <div>Cargando...</div>
            ) : categories.length >= 1 ? (
                <MenuCRUD categories={categories} mutate={mutate} />
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
                action={
                    <CancelAcceptButtons onCancel={handleClose} onAccept={addCategoryCallback} />
                }>
                <Createform
                    fields={formFields}
                    handleChange={handleChange}
                    formValues={formValues}
                />
            </Dialog>
        </>
    );
}
