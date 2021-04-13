import { useEffect } from 'react';
import Applayout from '../../src/components/Layouts/Applayout';
import withAuth from '../../src/components/withAuth';
import MenuManager from '../../src/components/MenuManager/MenuManager';
import { useQuery } from '@apollo/client';
import { GET_USER_MENU } from '../../src/components/MenuManager/getUserMenu';
import { useStateValue } from '../../src/State/StateProvider';
const menuManager = (props) => {
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

    if (data) {
        return (
            <Applayout user={props.user}>
                <MenuManager user={data.user} />
            </Applayout>
        );
    }
};
export default withAuth(menuManager);
