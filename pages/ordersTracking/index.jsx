import useLocalStorage from '../../src/hooks/useLocalStorage';
import { gql, useQuery } from '@apollo/client';
import OrdersTraking from '../../src/components/OrdersTracking/OrdersTracking';
import Header from '../../src/components/OrdersTracking/Header';
const GET_ORDERS = gql`
    query ordersByClient($input: [OrdersByClientInput]!) {
        ordersByClient(input: $input) {
            _id
            restaurant
            quantity
            createdTime
            confirmedTime
            finishedTime
            state
            table {
                _id
                name
            }
            item {
                name
                price
            }
            clientName
            clientPhone
        }
    }
`;

function index() {
    const key = 'clientOrders';
    const [orders] = useLocalStorage(key);

    const { loading, error, data } = useQuery(GET_ORDERS, {
        variables: { input: orders },
        pollInterval: 10000
    });

    if (loading) return null;
    if (error) return `sapo! ${error}`;

    return (
        <>
            <Header />
            <OrdersTraking orders={data.ordersByClient} />
        </>
    );
}

export default index;
