import { useEffect } from 'react';
import { useStateValue } from '../State/StateProvider';

const findCurrentRestaurant = (restaurants) => {
    const storedId = JSON.parse(localStorage.getItem('_id'));
    if (storedId) {
        const currentRestaurant = restaurants.filter((restaurant) => restaurant.id === storedId)[0];

        if (currentRestaurant) {
            return currentRestaurant;
        }
    }

    return restaurants[0];
};

export default function useCurrentVenue() {
    const [{ currentRestaurant, restaurant }, dispatch] = useStateValue();

    const restaurants = restaurant.venues;

    const setCurrentRestaurant = (restaurant) => {
        try {
            if (restaurant) {
                localStorage.setItem('_id', JSON.stringify(restaurant.id));
            }

            dispatch({ type: 'SET_CURRENT_RESTAURANT', currentRestaurant: restaurant });
        } catch (e) {
            console.log(e);
        }
    };
    useEffect(() => {
        const selectedCurrentRestaurant = findCurrentRestaurant(restaurants);
        if (selectedCurrentRestaurant) {
            setCurrentRestaurant(selectedCurrentRestaurant);
        } else {
            setCurrentRestaurant(null);
        }
    }, [restaurants]);

    return { currentRestaurant, setCurrentRestaurant, restaurants };
}
