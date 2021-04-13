import { useState, useEffect, useCallback } from 'react';
import { GET_ORDERS_BY_RESTAURANTS } from '../components/Orders/getOrdersByRestaurant';
import { useQuery } from '@apollo/client';
import { NetworkStatus } from '@apollo/client';

const Orders = ({ states, restaurant }) => {
    const [orders, setOrders] = useState([]);

    const queryObject = useQuery(GET_ORDERS_BY_RESTAURANTS, {
        variables: { states, restaurant }
    });

    const { loading, error, data, refetch: _refetch, networkStatus } = queryObject;

    const refetch = useCallback(() => {
        setTimeout(() => {
            if (queryObject && networkStatus !== NetworkStatus.refetch) {
                try {
                    _refetch();
                } catch (error) {
                    console.log(error);
                }
            }
        }, 0);
    }, [_refetch]);

    useEffect(() => {
        const interval = setInterval(() => {
            refetch();
        }, 2500);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        if (data) {
            const fetchedOrdersLength = data.ordersByRestaurant.length;
            if (fetchedOrdersLength >= 0) {
                setOrders(data.ordersByRestaurant);
            }
        }
    }, [data]);

    return { loading, error, orders };
};
export default Orders;
