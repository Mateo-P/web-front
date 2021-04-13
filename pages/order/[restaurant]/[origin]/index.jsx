import { useEffect, useState } from 'react';
import { scrollSpy } from 'react-scroll';
import { useRouter } from 'next/router';
import MenuNav from '../../../../src/components/Client/MenuNav';
import Menu from '../../../../src/components/Client/Menu';
import { gql } from '@apollo/client';
import { createApolloClientSSR } from '../../../../apollo/client';
import { useStateValue } from 'State/StateProvider';

const GET_RESTAURANT_INFO_QUERY = gql`
    query GET_RESTAURANT_INFO_QUERY($restaurantId: ID!) {
        restaurant(id: $restaurantId) {
            name
            phone
            categories {
                name
                items {
                    _id
                    name
                    description
                    price
                    image {
                        uri
                    }
                    options {
                        name
                        min
                        max
                        entries {
                            name
                            price
                        }
                    }
                }
            }
        }
    }
`;

function Order(props) {
    const { data, restaurantId, originId } = props;
    const categories = data.restaurant.categories;
    const [location, setLocation] = useState(null);
    const router = useRouter();
    const filteredCategories = categories.filter((category) => category.items.length > 0);
    const dispatch = useStateValue()[1];

    useEffect(() => {
        getLocation();
        validateLocation();
        scrollSpy.update();
        dispatch({
            type: 'SET_CURRENT_RESTAURANT',
            currentRestaurant: data.restaurant
        });
    }, []);

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
                const restaurant = router.query.restaurant;
                router.push(`/order/${restaurant}`);
            } else {
                //'estas dentro pai');
            }
        }
    };

    return (
        <>
            <MenuNav
                restaurantId={restaurantId}
                originId={originId}
                restaurantName={data.restaurant.name}
                restaurantPhone={data.restaurant.phone}
                categories={filteredCategories}
            />
            <Menu restaurantId={restaurantId} categories={filteredCategories} />
        </>
    );
}

export const getServerSideProps = async ({ query }) => {
    const apolloClient = createApolloClientSSR();
    const restaurantId = query.restaurant;
    const originId = query.origin;

    const { data } = await apolloClient.query({
        query: GET_RESTAURANT_INFO_QUERY,
        variables: {
            restaurantId
        }
    });

    return {
        props: {
            data,
            restaurantId,
            originId
        }
    };
};

export default Order;
