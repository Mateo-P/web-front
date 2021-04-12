import { useState } from 'react';
import MenuList from './MenuList';
import Createform from 'components/shared/Forms/Createform';
import Deleteform from 'components/shared/Forms/Deleteform';
import { validateForm } from '../../shared/utils';
import fetcher from 'shared/fetcher';
import { useStateValue } from '../../State/StateProvider';
import Dialog from 'components/shared/Dialog';
import CancelAcceptButtons from 'components/shared/Dialog/CancelAcceptButtons';
import ItemCrudForm from '../Item/ItemCrudForm';
import { deleteCategory, updateCategory, sortCategory } from './Category';
const initialCategoryFields = [{ label: 'Nombre', value: 'name', error: null }];
export default function MenuCRUD({
    categories,
    editable = true,
    availability = false,
    handleAvailableChange,

    mutate
}) {
    const [{ itemFormFields, item, token, restaurant }, dispatch] = useStateValue();

    const [open, setOpen] = useState(false);
    const [categoryFields, setCategoryformfields] = useState(initialCategoryFields);
    const [categoryValues, setCategoryValues] = useState({});
    const [categoryId, setCategoryid] = useState({});

    const [crud, setCrud] = useState('');
    const handleChange = (value) => (e) => {
        if (handleAvailableChange) {
            handleAvailableChange(e);
        }
        setCategoryValues({ ...categoryValues, [value]: e.target.value });
    };

    const addItemCallback = async () => {
        if (validateForm(itemFormFields, item, setItemFieldsError)) {
            let categoriesArray = [];

            categoriesArray.push(categoryId);

            let newItem = {
                categories: [categoryId],
                restaurant: restaurant.id,
                name: item.name,
                description: item.description,
                price: parseFloat(item.price),
                not_available_at: []
            };

            const response = await fetcher('menu/items/', 'POST', token, newItem);

            if (item.file && !response.error) {
                newItem.image = item.file;
                await fetcher(
                    `menu/items/${response.id}/`,
                    'PATCH',
                    token,
                    { image: item.file },
                    true
                );
            }

            mutate();

            dispatch({
                type: 'CLEAR_ITEM'
            });
            setOpen(false);
        }
    };
    const editCategoryCallback = () => {
        if (validateForm(categoryFields, categoryValues, setCategoryformfields)) {
            updateCategory({ categoryId, name: categoryValues.name }, categories, token, mutate);
            setCategoryValues({});

            setOpen(false);
        }
    };
    const deleteCategoryCallback = () => {
        setOpen(false);
        deleteCategory(categoryId, categories, token, mutate);
    };
    const handleCategoryOrderCallback = (id, move) => {
        sortCategory(id, move, categories, token, mutate);
    };
    const handleOpenCategoryCrud = (id, crud, name) => {
        setOpen(true);
        setCategoryid(id);
        setCrud(crud);
        if (name) {
            setCategoryValues({ name });
        }
    };

    const handleClose = () => {
        setOpen(false);
        setCrud('');
        setCategoryValues({});
        dispatch({
            type: 'CLEAR_ITEM'
        });
    };
    const setItemFieldsError = (updatedItemFields) => {
        dispatch({
            type: 'SET_FIELDS_ERRORS',
            itemFormFields: updatedItemFields
        });
    };
    return (
        <>
            {categories.map((category, i) => (
                <MenuList
                    editable={editable}
                    category={category}
                    handleOrder={handleCategoryOrderCallback}
                    key={i}
                    position={i}
                    lastCase={i == categories.length - 1}
                    handleOpenCrud={handleOpenCategoryCrud}
                    availability={availability}
                    handleAvailableChange={handleAvailableChange}
                    mutate={mutate}
                />
            ))}
            <Dialog
                title={
                    crud === 'DELETE'
                        ? 'Eliminar categoria'
                        : crud === 'EDIT'
                        ? 'Editar categoria'
                        : 'Crear Item'
                }
                open={open}
                onClose={handleClose}
                action={
                    <CancelAcceptButtons
                        onCancel={handleClose}
                        onAccept={
                            crud === 'DELETE'
                                ? deleteCategoryCallback
                                : crud === 'EDIT'
                                ? editCategoryCallback
                                : addItemCallback
                        }
                    />
                }>
                {crud === 'DELETE' ? (
                    <Deleteform message={`Se eliminará la categoria y consigo todos sus items`} />
                ) : crud === 'EDIT' ? (
                    <Createform
                        fields={categoryFields}
                        handleChange={handleChange}
                        formValues={categoryValues}
                    />
                ) : (
                    <ItemCrudForm />
                )}
            </Dialog>
        </>
    );
}
