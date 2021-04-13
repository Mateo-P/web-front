import { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import useNetwork from '../../hooks/useNetwork';
import useReceiveOrder from '../../hooks/useReceiveOrder';
import { useStateValue } from '../../State/StateProvider';
import { useQuery } from '@apollo/client';
import { GET_USER_INFO } from '../Profile/getImageUser';
import useWaiterNotifications from './waiter/useWaiterNotifications';
import LayoutContent from './LayoutContent';
import dynamic from 'next/dynamic';
import { COMPLEAT_LOGO_URI } from 'shared/constants';

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

    const { data } = useQuery(GET_USER_INFO, {
        variables: { email: props.user.email }
    });
    const [{ user }, dispatch] = useStateValue();

    useEffect(() => {
        if (data) {
            let use2 = props.user;

            use2.image = data.user.image ? data.user.image.uri : COMPLEAT_LOGO_URI;

            dispatch({
                type: 'SET_USER',
                user: use2
            });
        }
    }, [data]);

    useNetwork();
    useWaiterNotifications(props.user);
    useReceiveOrder(props.user);

    return (
        <div className={classes.root}>
            <div className={classes.container}>
                <LayoutMenus />
                <LayoutContent user={user}>{props.children}</LayoutContent>
            </div>
        </div>
    );
}
