import { useEffect } from 'react';
import { gql } from '@apollo/client';
import { useQuery } from '@apollo/client';
import { useStateValue } from 'State/StateProvider';

const GET_RESTAURANT_OWNER_INFO = gql`
    query GET_RESTAURANT_INFO_QUERY($restaurantId: ID!) {
        restaurant(id: $restaurantId) {
            owner {
                email
                image {
                    uri
                }
            }
        }
    }
`;

export default function useOwnerInfo(restaurantId) {
    const { loading, data } = useQuery(GET_RESTAURANT_OWNER_INFO, {
        variables: { restaurantId }
    });

    useEffect(() => {
        if (!loading) {
            dispatch({ type: 'SET_USER', user: data?.restaurant.owner });
        }
    }, [loading]);

    const [{ user }, dispatch] = useStateValue();

    return { loading, user };
}
