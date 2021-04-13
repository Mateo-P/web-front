import React from 'react';
import RestaurantDropdown from '../shared/RestaurantDropdown';
import AvailabilityMenu from './AvailabilityMenu';
import useRestaurant from '../../hooks/useRestaurant';
import PageHeader from '../shared/PageHeader';
import EmptyItemsMessage from 'components/shared/EmptyItemsMessage';
import { useRouter } from 'next/router';

export default function AvailabilityManager({ user }) {
    const { currentRestaurant } = useRestaurant();

    const router = useRouter();

    return (
        <div>
            <PageHeader title="Disponibilidad de ítems">
                <RestaurantDropdown />
            </PageHeader>
            {currentRestaurant &&
                user.categories &&
                (user.categories && user.categories.length >= 1 ? (
                    <AvailabilityMenu restaurant={currentRestaurant} user={user} />
                ) : (
                    <EmptyItemsMessage
                        text="Para manejar las disponibilidades de tus ítems, primero debes crear tu menú."
                        actionLabel="Ir a crear mi menú"
                        onAction={() => router.push('/menuManager')}
                    />
                ))}
        </div>
    );
}
