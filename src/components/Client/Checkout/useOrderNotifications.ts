import { useEffect } from 'react';
import { channels, pushData } from '../../../lib/pusher';
import { useSnackbar } from 'notistack';
import { useStateValue } from '../../../State/StateProvider';

export default function useOrderNotifications(venueId: string) {
    const { user, currentRestaurant } = useStateValue()[0];

    const venueName = currentRestaurant ? currentRestaurant.name : 'una sede';

    const sendOrderNotification = () => {
        pushData({
            channel: 'owner-' + user.email,
            event: 'new-order',
            params: { venueId, venueName }
        });
    };

    return { sendOrderNotification };
}
