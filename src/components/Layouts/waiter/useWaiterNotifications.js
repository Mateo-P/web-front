import { useState, useEffect } from 'react';
import { useLazyQuery } from '@apollo/client';
import { FIND_TABLENAME_BY_ID } from '../ApplayoutQueries';
import { useSnackbar } from 'notistack';
import ToastActionButton from '../../Toast/ToastActionButton';
import { channels, pushData } from 'lib/pusher';

const useWaiterNotifications = (user) => {
    const [restaurant, setRestaurant] = useState(null);

    const [findTable, useLazyQueryObject] = useLazyQuery(FIND_TABLENAME_BY_ID, {
        fetchPolicy: 'network-only',
        notifyOnNetworkStatusChange: true
    });

    const { enqueueSnackbar } = useSnackbar();
    const channel = channels.subscribe(user ? `owner-${user.email}` : null);

    useEffect(() => {
        // Bind a callback function to an event within the subscribed channel
        channel.bind('client-call-waiter', function (event) {
            if (event && useLazyQueryObject !== undefined) {
                if (
                    useLazyQueryObject.called &&
                    !useLazyQueryObject.loading &&
                    useLazyQueryObject.refetch
                ) {
                    useLazyQueryObject.refetch({ variables: { _id: event.table } });
                } else {
                    findTable({ variables: { _id: event.table } });
                }

                setRestaurant(event.restaurant);
            }
        });
    }, []);

    useEffect(() => {
        if (!useLazyQueryObject.loading) {
            if (useLazyQueryObject.data && restaurant) {
                const { name, _id } = useLazyQueryObject.data.findTable.table;

                const message = `${restaurant}: Mesero solicitado en ${name}`;

                const acceptWaiterCallback = () => {
                    pushData({
                        channel: 'table-' + _id,
                        event: 'restaurant-accept-waiter',
                        params: null
                    });
                };

                const action = (key) => {
                    return (
                        <ToastActionButton callback={acceptWaiterCallback} key={key}>
                            aceptar
                        </ToastActionButton>
                    );
                };
                enqueueSnackbar(message, {
                    variant: 'info',
                    preventDuplicate: true,
                    persist: true,
                    action
                });
            }
        }
    }, [useLazyQueryObject.data, restaurant, useLazyQueryObject.loading]);

    return true;
};

export default useWaiterNotifications;
