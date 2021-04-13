import { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { useStateValue } from '../State/StateProvider';
import { GET_USER_RESTAURANTS } from '../components/RestaurantsManager/getUserRestaurants';

const findCurrentRestaurant = (restaurants) => {
    if (JSON.parse(localStorage.getItem('_id'))) {
        const currentRestaurant = restaurants.filter(
            (restaurant) => restaurant._id === JSON.parse(localStorage.getItem('_id'))
        )[0];

        if (currentRestaurant) {
            return currentRestaurant;
        }
    }

    return restaurants[0];
};

export default function useRestaurant() {
    const [{ currentRestaurant, user }, dispatch] = useStateValue();

    const { loading, data } = useQuery(GET_USER_RESTAURANTS, {
        variables: { email: user.email }
    });

    const restaurants = loading ? null : data.restaurantsByOwner;

    const [loadingRestaurant, setLoadingRestaurant] = useState(true);

    useEffect(() => {
        if (currentRestaurant !== undefined) {
            setLoadingRestaurant(false);
        }
    }, [loading, currentRestaurant]);

    const setCurrentRestaurant = (restaurant) => {
        try {
            if (restaurant) {
                localStorage.setItem('_id', JSON.stringify(restaurant._id));
            }

            dispatch({ type: 'SET_CURRENT_RESTAURANT', currentRestaurant: restaurant });
        } catch (e) {
            console.log(e);
        }
    };
    useEffect(() => {
        if (!loading) {
            const selectedCurrentRestaurant = findCurrentRestaurant(restaurants);
            if (selectedCurrentRestaurant) {
                setCurrentRestaurant(selectedCurrentRestaurant);
            } else {
                setCurrentRestaurant(null);
            }
        }
    }, [restaurants, loading]);

    return { currentRestaurant, setCurrentRestaurant, restaurants, loadingRestaurant };
}
