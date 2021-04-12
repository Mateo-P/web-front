import { useEffect, useState } from 'react';
import { channels, pushData } from 'lib/pusher';
import { useSnackbar } from 'notistack';

const useRequestWaiter = (tableId, restaurantName, ownerEmail) => {
    const { enqueueSnackbar } = useSnackbar();
    const [isComing, setIsComing] = useState(false);

    const channel = channels.subscribe(`table-${tableId}`);

    const handleRequest = () => {
        pushData({
            channel: 'owner-' + ownerEmail,
            event: 'client-call-waiter',
            params: { table: tableId, restaurant: restaurantName }
        });
    };

    useEffect(() => {
        channel.bind('restaurant-accept-waiter', function () {
            enqueueSnackbar('¡El mesero se encuentra en camino!', {
                variant: 'info',
                preventDuplicate: true,
                autoHideDuration: 10000
            });
            setIsComing(true);
        });
    }, []);

    return { handleRequest, isComing };
};

export default useRequestWaiter;
