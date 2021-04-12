import Dropdown from '../Dropdown';
import useCurrentVenue from '../../hooks/useCurrentVenue';

export default function RestaurantDropdown() {
    const { currentRestaurant, setCurrentRestaurant, restaurants } = useCurrentVenue();

    return (
        <>
            {!currentRestaurant ? (
                <>Cargando...</>
            ) : (
                <Dropdown
                    name="Sede"
                    items={restaurants}
                    hook={[currentRestaurant, setCurrentRestaurant]}
                />
            )}
        </>
    );
}
