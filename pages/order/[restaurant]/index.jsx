import { useEffect } from 'react';
import { scrollSpy } from 'react-scroll';
import { gql } from '@apollo/client';
import { createApolloClientSSR } from '../../../apollo/client';
import MenuNav from '../../../src/components/Client/MenuNav';
import Menu from '../../../src/components/Client/Menu';

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
function index(props) {
    const { data, restaurantId } = props;
    const categories = data.restaurant.categories;
    const filteredCategories = categories.filter((category) => category.items.length > 0);

    useEffect(() => {
        scrollSpy.update();
    });

    return (
        <>
            <MenuNav
                restaurantName={data.restaurant.name}
                restaurantId={restaurantId}
                categories={filteredCategories}
                viewonly
            />
            <Menu restaurantId={restaurantId} categories={filteredCategories} viewonly />
        </>
    );
}
export const getServerSideProps = async ({ query }) => {
    const apolloClient = createApolloClientSSR();
    const restaurantId = query.restaurant;
    const { data } = await apolloClient.query({
        query: GET_RESTAURANT_INFO_QUERY,
        variables: {
            restaurantId
        }
    });

    return {
        props: {
            data,
            restaurantId
        }
    };
};
export default index;
