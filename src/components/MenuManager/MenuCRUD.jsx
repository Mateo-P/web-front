import { useState } from 'react';
import MenuList from './MenuList';
import { useMutation } from '@apollo/client';
import Createform from 'components/shared/Forms/Createform';
import Deleteform from 'components/shared/Forms/Deleteform';
import { validateForm } from '../../shared/utils';
import { GET_USER_MENU } from './getUserMenu';
import { CHANGE_ORDER_MUTATION } from './changeOrderCategory';
import { DELETE_CATEGORY } from './deleteCategory';
import { ADD_ITEM_MUTATION } from './addItem';
import { EDIT_CATEGORY } from './editCategory';
import { useStateValue } from '../../State/StateProvider';
import Dialog from 'components/shared/Dialog';
import CancelAcceptButtons from 'components/shared/Dialog/CancelAcceptButtons';
import ItemCrudForm from '../Item/ItemCrudForm';

const initialCategoryFields = [{ label: 'Nombre', value: 'name', error: null }];
export default function MenuCRUD({
    user,
    editable = true,
    availability = false,
    handleAvailableChange
}) {
    const { categories, email } = user;
    const [{ itemFormFields, item }, dispatch] = useStateValue();

    const [open, setOpen] = useState(false);
    const [categoryFields, setCategoryformfields] = useState(initialCategoryFields);
    const [categoryValues, setCategoryValues] = useState({});
    const [categoryId, setCategoryid] = useState({});

    const [crud, setCrud] = useState('');

    const [changeCategoryOrder] = useMutation(CHANGE_ORDER_MUTATION, {
        update(cache, { data: { changeCategoryOrder } }) {
            let newOrderCategories = {
                ...user,
                categories: changeCategoryOrder.categories
            };
            cache.writeQuery({
                query: GET_USER_MENU,
                variables: {
                    email
                },
                data: { user: newOrderCategories }
            });
        }
    });
    const [deleteCategory] = useMutation(DELETE_CATEGORY, {
        update(cache, { data: { deleteCategory } }) {
            let remainingCategories = {
                ...user,
                categories: categories.filter(
                    (category) => category._id !== deleteCategory.category._id
                )
            };
            cache.writeQuery({
                query: GET_USER_MENU,
                variables: {
                    email
                },
                data: { user: remainingCategories }
            });
        }
    });
    const [addItem] = useMutation(ADD_ITEM_MUTATION, {
        update(cache, { data: { addItem } }) {
            let newItem = addItem.item;
            const categoryIndex = categories.findIndex(
                (category) => category._id === newItem.category
            );
            let newMenu = {
                ...user,
                categories: [...categories[categoryIndex].items, newItem]
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
    const [editCategory] = useMutation(EDIT_CATEGORY, {
        update(cache, { data: { editCategory } }) {
            let editedCategory = editCategory.category;
            let newMenu = {
                ...user,
                categories: categories.map((cat) => {
                    if (cat._id === categoryId) {
                        return editedCategory;
                    }
                    return cat;
                })
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
        if (handleAvailableChange) {
            handleAvailableChange(e);
        }
        setCategoryValues({ ...categoryValues, [value]: e.target.value });
    };

    const addItemCallback = () => {
        if (validateForm(itemFormFields, item, setItemFieldsError)) {
            addItem({
                variables: {
                    owner: email,
                    category: categoryId,
                    name: item.name,
                    description: item.description,
                    price: parseFloat(item.price),
                    image: item.file,
                    options: item.options
                }
            });
            dispatch({
                type: 'CLEAR_ITEM'
            });
            setOpen(false);
        }
    };
    const editCategoryCallback = () => {
        if (validateForm(categoryFields, categoryValues, setCategoryformfields)) {
            editCategory({
                variables: {
                    _id: categoryId,
                    name: categoryValues.name
                }
            });
            setCategoryValues({});

            setOpen(false);
        }
    };
    const deleteCategoryCallback = () => {
        deleteCategory({
            variables: {
                _id: categoryId
            }
        });
        setOpen(false);
    };
    const handleOpenCategoryCrud = (id, crud, name) => {
        setOpen(true);
        setCategoryid(id);
        setCrud(crud);
        if (name) {
            setCategoryValues({ name });
        }
    };

    const handleOrder = (categoryId, newPosition) => {
        changeCategoryOrder({
            variables: {
                _id: categoryId,
                position: newPosition
            }
        });
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
        <div>
            {categories?.map((category, i) => (
                <MenuList
                    editable={editable}
                    category={category}
                    handleOrder={handleOrder}
                    key={i}
                    position={i}
                    lastCase={i == categories.length - 1}
                    handleOpenCrud={handleOpenCategoryCrud}
                    availability={availability}
                    handleAvailableChange={handleAvailableChange}
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
        </div>
    );
}
