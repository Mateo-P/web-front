import useRestaurant from '../../hooks/useRestaurant';
import EmptyItemsMessage from 'components/shared/EmptyItemsMessage';
import { useRouter } from 'next/router';

export default function RestaurantsUnavailable({ children }) {
    const { currentRestaurant, restaurants, loadingRestaurant } = useRestaurant();

    const hasRestaurants = currentRestaurant && restaurants && restaurants.length > 0;

    if (loadingRestaurant) {
        return 'Cargando...';
    }

    const router = useRouter();

    return (
        <>
            {hasRestaurants ? (
                children
            ) : (
                <EmptyItemsMessage
                    text="Todavía no tienes sedes registradas."
                    actionLabel="Ir a registrar mis sedes"
                    onAction={() => router.push('/restaurants')}
                />
            )}
        </>
    );
}
