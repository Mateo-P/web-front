import { useEffect } from 'react';
import { scrollSpy } from 'react-scroll';
import { useRouter } from 'next/router';
import MenuNav from '../../../../src/components/Client/MenuNav';
import Menu from '../../../../src/components/Client/Menu';
import { useStateValue } from 'State/StateProvider';
import useApi from '../../../../src/hooks/useApi';
function Order() {
    const router = useRouter();
    const restaurantId = router.query.restaurant;
    const { payload: restaurantMenu, isLoading } = useApi(
        'GET',
        `menu/diner?venue=${restaurantId}`
    );

    const dispatch = useStateValue()[1];
    useEffect(() => {
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
                    viewonly
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
