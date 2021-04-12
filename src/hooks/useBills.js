import { useState, useEffect, useCallback } from 'react';
import { GET_BILLS_BY_RESTAURANTS } from '../components/Billing/getBillsByRestaurant';
import { useQuery } from '@apollo/client';
import { NetworkStatus } from '@apollo/client';

const Bills = ({ states, restaurant }) => {
    const [bills, setBills] = useState([]);

    const queryObject = useQuery(GET_BILLS_BY_RESTAURANTS, {
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
            const fetchedOrdersLength = data.billsByRestaurant.length;
            if (fetchedOrdersLength >= 0) {
                setBills(data.billsByRestaurant);
            }
        }
    }, [data]);

    return { loading, error, bills };
};
export default Bills;
