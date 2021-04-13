import Dropdown from '../Dropdown';
import useRestaurant from '../../hooks/useRestaurant';

export default function RestaurantDropdown() {
    const { currentRestaurant, setCurrentRestaurant, restaurants } = useRestaurant();

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
