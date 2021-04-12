import { useState, useEffect, useCallback } from 'react';
import useApi from './useApi';
const Orders = ({ states, restaurant }) => {
    console.log(restaurant);
    const [orders, setOrders] = useState([]);

    const { payload, isLoading, error, mutate } = useApi('GET', 'orders/');

    useEffect(() => {
        const interval = setInterval(() => {
            mutate();
        }, 2500);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        if (payload) {
            setOrders(payload);
        }
    }, [payload]);

    return { isLoading, error, orders };
};
export default Orders;
