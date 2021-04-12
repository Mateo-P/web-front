import { useState, useEffect } from 'react';
import { useSnackbar } from 'notistack';
import ToastCloseButton from '../components/Toast/ToastCloseButton';

export default function useNetwork() {
    const { enqueueSnackbar } = useSnackbar();
    const [isOnline, setNetwork] = useState(true);

    const updateNetwork = () => {
        const onlineUpdate = window.navigator.onLine;
        if (isOnline && !onlineUpdate) {
            enqueueSnackbar('Se ha perdido la conexión a internet!', {
                variant: 'error',
                preventDuplicate: true,
                persist: true,
                action: ToastCloseButton
            });
        } else if (!isOnline && onlineUpdate) {
            enqueueSnackbar('Se ha restaurado la conexión!', {
                variant: 'info',
                preventDuplicate: true
            });
        }

        setNetwork(onlineUpdate);
    };

    useEffect(() => {
        if (typeof window !== undefined) {
            window.addEventListener('offline', updateNetwork);
            window.addEventListener('online', updateNetwork);
        }

        return () => {
            window.removeEventListener('offline', updateNetwork);
            window.removeEventListener('online', updateNetwork);
        };
    });

    return isOnline;
}
