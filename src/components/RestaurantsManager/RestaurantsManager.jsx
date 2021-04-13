import React, { useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import Createform from 'components/shared/Forms/Createform';
import RestaurantCard from './RestaurantCard';
import Grid from '@material-ui/core/Grid';
import { validateForm } from '../../shared/utils';
import { ADD_RESTAURANT_MUTATION } from './addRestaurant';
import { GET_USER_RESTAURANTS } from './getUserRestaurants';
import AddButton from '../shared/AddButton';
import PageHeader from '../shared/PageHeader';
import Dialog from 'components/shared/Dialog';
import CancelAcceptButtons from 'components/shared/Dialog/CancelAcceptButtons';
import EmptyItemsMessage from 'components/shared/EmptyItemsMessage';

const initialValues = [
    { label: 'Nombre', value: 'name', error: null },
    { label: 'Dirección', value: 'address', error: null }
];

export default function RestaurantsManager({ email }) {
    const [formFields, setFormField] = useState(initialValues);
    const [open, setOpen] = useState(false);
    const [formValues, setFormValues] = useState({});
    const [addRestaurant] = useMutation(ADD_RESTAURANT_MUTATION, {
        update(cache, { data: { addRestaurant } }) {
            const existingRestaurants = cache.readQuery({
                query: GET_USER_RESTAURANTS,
                variables: {
                    email
                }
            });
            let oldRestaurants = existingRestaurants.restaurantsByOwner;
            let newRestaurant = addRestaurant.restaurant;
            cache.writeQuery({
                query: GET_USER_RESTAURANTS,
                variables: {
                    email
                },
                data: { restaurantsByOwner: [newRestaurant, ...oldRestaurants] }
            });
        }
    });
    const { loading, error, data } = useQuery(GET_USER_RESTAURANTS, {
        variables: { email }
    });

    const handleChange = (value) => (e) => {
        setFormValues({ ...formValues, [value]: e.target.value });
    };

    const addCallback = () => {
        let validate = validateForm(formFields, formValues, setFormField);

        if (validate) {
            addRestaurant({
                variables: {
                    name: formValues.name,
                    address: formValues.address,
                    email
                }
            });
            setOpen(false);
            setFormField(initialValues);
            setFormValues({});
        }
    };
    const handleClose = () => {
        setOpen(false);
        setFormField(initialValues);
        setFormValues({});
    };
    if (loading) return <div>Cargando...</div>;

    if (error) return `Error! ${error.message}`;
    if (data) {
        return (
            <div>
                <PageHeader title="Sedes registradas">
                    <AddButton title="Registrar nueva sede" onClick={() => setOpen(true)} />
                </PageHeader>

                <Grid container spacing={1}>
                    {data.restaurantsByOwner.length >= 1 ? (
                        <>
                            {data.restaurantsByOwner.map((restaurant, i) => (
                                <Grid key={i} item xs={12} md={4}>
                                    <RestaurantCard
                                        _id={restaurant._id}
                                        name={restaurant.name}
                                        address={restaurant.address}
                                    />
                                </Grid>
                            ))}
                        </>
                    ) : (
                        <EmptyItemsMessage
                            text={'¡Aún no tienes sedes registradas!'}
                            actionLabel="registrar mi primera sede"
                            onAction={() => setOpen(true)}
                        />
                    )}
                </Grid>
                <Dialog
                    open={open}
                    onClose={handleClose}
                    title={'Registrar sede'}
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
}
