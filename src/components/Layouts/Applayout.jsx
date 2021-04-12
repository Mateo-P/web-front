import { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import useNetwork from '../../hooks/useNetwork';
import useReceiveOrder from '../../hooks/useReceiveOrder';
import { useStateValue } from 'State/StateProvider';
import useWaiterNotifications from './waiter/useWaiterNotifications';
import LayoutContent from './LayoutContent';
import dynamic from 'next/dynamic';
import useApi from 'hooks/useApi';
import { useRouter } from 'next/router';

const LayoutMenus = dynamic(() => import('./LayoutMenus'), { ssr: false });

const useStyles = makeStyles({
    root: {
        position: 'fixed',
        zIndex: 10,
        width: '100%'
    },
    container: {
        display: 'flex'
    }
});

export default function AppLayout(props) {
    const classes = useStyles();

    const [{ restaurant }, dispatch] = useStateValue();

    const { payload, isLoading, error } = useApi('GET', 'restaurants/');
    const router = useRouter();

    useEffect(() => {
        if (payload && !isLoading && !error) {
            if (payload.length === 0) {
                router.push('/onboarding');
            } else {
                dispatch({
                    type: 'SET_RESTAURANT_INFO',
                    restaurant: payload[0]
                });
            }
        }
    }, [payload, isLoading, error]);

    useNetwork();
    useWaiterNotifications(props.user);
    useReceiveOrder(props.user);

    if (isLoading || !restaurant) {
        return <div>Cargando....</div>;
    } else
        return (
            <div className={classes.root}>
                <div className={classes.container}>
                    <LayoutMenus />
                    <LayoutContent user={props.user}>{props.children}</LayoutContent>
                </div>
            </div>
        );
}
