import { useEffect } from 'react';
import Applayout from '../../src/components/Layouts/Applayout';
import withAuth from '../../src/components/withAuth';
import AvailabilityManager from '../../src/components/AvailabilityManager/AvailabilityManager';
import RestaurantsUnavailable from '../../src/components/shared/RestaurantsUnavailable';
import { useQuery } from '@apollo/client';
import { GET_USER_MENU } from '../../src/components/MenuManager/getUserMenu';
import { useStateValue } from '../../src/State/StateProvider';

const AvailabilityPage = (props) => {
    const dispatch = useStateValue()[1];
    const { loading, error, data, refetch } = useQuery(GET_USER_MENU, {
        variables: { email: props.user.email }
    });

    useEffect(() => {
        dispatch({
            type: 'SET_REFETCH',
            GrandParentCallback: refetch
        });
    }, [data]);

    if (error) return `Error! ${error.message}`;

    if (loading) return <Applayout user={props.user}>Cargando...</Applayout>;

    return (
        <>
            <div style={{ position: 'fixed', zIndex: 10, width: '100%' }}>
                <Applayout user={props.user}>
                    <RestaurantsUnavailable>
                        <AvailabilityManager user={data.user} />
                    </RestaurantsUnavailable>
                </Applayout>
            </div>
        </>
    );
};
export default withAuth(AvailabilityPage);
