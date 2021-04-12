import { useEffect } from 'react';
import { channels } from '../lib/pusher';
import { useSnackbar } from 'notistack';

export default function useReceiveOrder(user) {
    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
        const newOrderAudio = new Audio('/audio/new-order-audio.wav');
        const channel = channels.subscribe(user ? `owner-${user.email}` : null);
        channel.bind('new-order', function (data) {
            newOrderAudio.play();
            enqueueSnackbar(`¡Nuevo pedido en ${data.venueName}!`, {
                variant: 'success',
                preventDuplicate: true,
                autoHideDuration: 10000
            });
        });
    }, []);

    return {};
}
