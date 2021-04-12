import { useEffect, useState } from 'react';
import { scrollSpy } from 'react-scroll';
import { useRouter } from 'next/router';
import MenuNav from '../../../../src/components/Client/MenuNav';
import Menu from '../../../../src/components/Client/Menu';
import { useStateValue } from 'State/StateProvider';
import useApi from '../../../../src/hooks/useApi';
function Order() {
    const router = useRouter();
    const restaurantId = router.query.restaurant;
    const originId = router.query.origin;
    console.log(restaurantId);
    const { payload: restaurantMenu, isLoading } = useApi(
        'GET',
        restaurantId && `menu/diner?venue=${restaurantId}`
    );

    const [location, setLocation] = useState(null);

    const dispatch = useStateValue()[1];

    useEffect(() => {
        getLocation();
        validateLocation();
        scrollSpy.update();
    }, []);
    useEffect(() => {
        if (restaurantMenu) {
            dispatch({
                type: 'SET_RESTAURANT_INFO',
                restaurant: restaurantMenu[0].venue
            });
        }
    }, [restaurantMenu]);
    const getLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                let { latitude, longitude } = position.coords;
                setLocation({ latitude, longitude });
            });
        }
    };

    const validateLocation = () => {
        if (location) {
            let { latitude, longitude } = location;
            if (!(latitude > 0 && longitude < 0)) {
                router.push(`/order/${restaurantId}`);
            } else {
                //'estas dentro pai');
            }
        }
    };
    if (isLoading) {
        return <div>Cargando...</div>;
    }
    if (restaurantMenu) {
        console.log([restaurantMenu]);
        const categories = restaurantMenu[0].menu;
        const filteredCategories = categories.filter((category) => category.items.length > 0);
        let restaurantName = restaurantMenu[0].venue.name;
        return (
            <>
                <MenuNav
                    restaurantId={restaurantId}
                    originId={originId}
                    restaurantName={restaurantName}
                    restaurantPhone={'3144183191'}
                    categories={filteredCategories}
                />
                <Menu restaurantId={restaurantId} categories={filteredCategories} />
            </>
        );
    }
}

export default Order;
