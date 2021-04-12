import React from 'react';
import RestaurantDropdown from '../shared/RestaurantDropdown';
import AvailabilityMenu from './AvailabilityMenu';
import useCurrentVenue from '../../hooks/useCurrentVenue';
import PageHeader from '../shared/PageHeader';
import EmptyItemsMessage from 'components/shared/EmptyItemsMessage';
import { useRouter } from 'next/router';
import useApi from 'hooks/useApi';

export default function AvailabilityManager() {
    const { currentRestaurant } = useCurrentVenue();
    const { payload: categories, isLoading, mutate } = useApi('GET', 'menu/');

    const router = useRouter();

    return (
        <>
            <PageHeader title="Disponibilidad de ítems">
                <RestaurantDropdown />
            </PageHeader>
            {isLoading ? (
                <div>Cargando...</div>
            ) : categories.length >= 1 ? (
                <AvailabilityMenu
                    restaurant={currentRestaurant}
                    categories={categories}
                    mutate={mutate}
                />
            ) : (
                <EmptyItemsMessage
                    text="Para manejar las disponibilidades de tus ítems, primero debes crear tu menú."
                    actionLabel="Ir a crear mi menú"
                    onAction={() => router.push('/menuManager')}
                />
            )}
        </>
    );
}
