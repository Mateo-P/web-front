import React from 'react';
import RestaurantDropdown from '../shared/RestaurantDropdown';
import AvailabilityMenu from './AvailabilityMenu';
import useRestaurant from '../../hooks/useRestaurant';
import PageHeader from '../shared/PageHeader';
import EmptyItemsMessage from 'components/shared/EmptyItemsMessage';
import { useRouter } from 'next/router';
import { useIntl } from 'react-intl';
export default function AvailabilityManager({ user }) {
    const { currentRestaurant } = useRestaurant();
    const intl = useIntl();
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
                        text={intl.formatMessage({ id: 'availableManagerText' })}
                        actionLabel={intl.formatMessage({ id: 'availableManagerLabel' })}
                        onAction={() => router.push('/menuManager')}
                    />
                ))}
        </div>
    );
}
