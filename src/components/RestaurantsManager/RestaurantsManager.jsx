import React, { useState } from 'react';
import Createform from 'components/shared/Forms/Createform';
import RestaurantCard from './RestaurantCard';
import Grid from '@material-ui/core/Grid';
import { validateForm } from '../../shared/utils';
import AddButton from '../shared/AddButton';
import PageHeader from '../shared/PageHeader';
import Dialog from 'components/shared/Dialog';
import CancelAcceptButtons from 'components/shared/Dialog/CancelAcceptButtons';
import EmptyItemsMessage from 'components/shared/EmptyItemsMessage';
import { useStateValue } from 'State/StateProvider';
import fetcher from 'shared/fetcher';
import useApi from 'hooks/useApi';

const initialValues = [
    { label: 'Nombre', value: 'name', error: null },
    { label: 'Dirección', value: 'address', error: null },
    { label: 'teléfono', value: 'phone' }
];

export default function RestaurantsManager() {
    const [formFields, setFormField] = useState(initialValues);
    const [open, setOpen] = useState(false);
    const [formValues, setFormValues] = useState({});

    const { mutate, revalidate } = useApi('GET', 'restaurants/');

    const [{ restaurant, token }] = useStateValue();
    const { venues, name } = restaurant;

    const handleChange = (value) => (e) => {
        setFormValues({ ...formValues, [value]: e.target.value });
    };

    const handleClose = () => {
        setOpen(false);
        setFormField(initialValues);
        setFormValues({});
    };

    const addCallback = async () => {
        let validate = validateForm(formFields, formValues, setFormField);

        if (validate) {
            let newVenue = {
                name: formValues.name,
                address: formValues.address
                //phone_number: formValues.phone
            };

            await fetcher('restaurants/venues/', 'POST', token, newVenue);
            mutate([{ ...restaurant, venues: [...venues, newVenue] }], false);
            handleClose();
            revalidate();
        }
    };

    const deleteVenue = async (id) => {
        mutate([{ ...restaurant, venues: venues.filter((ve) => ve.id !== id) }], false);

        await fetcher(`restaurants/venues/${id}`, 'DELETE', token);

        revalidate();
    };

    const editVenue = async (id, editedVenue) => {
        // mutate(
        //     [
        //         {
        //             ...restaurant,
        //             venues: venues.splice(
        //                 restaurant.venues.findIndex((ve) => ve.id === id),
        //                 1,
        //                 editedVenue
        //             )
        //         }
        //     ],
        //     false
        // );

        await fetcher(`restaurants/venues/${id}/`, 'PATCH', token, editedVenue);

        revalidate();
    };

    return (
        <div>
            <PageHeader title={`Sedes en ${name}`}>
                <AddButton title="Registrar nueva sede" onClick={() => setOpen(true)} />
            </PageHeader>

            <Grid container spacing={1}>
                {venues.length >= 1 ? (
                    <>
                        {venues.map((venue, i) => (
                            <Grid key={i} item xs={12} md={4}>
                                <RestaurantCard
                                    _id={venue.id}
                                    name={venue.name}
                                    address={venue.address}
                                    deleteVenue={() => deleteVenue(venue.id)}
                                    editVenue={(editedVenue) => editVenue(venue.id, editedVenue)}
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
