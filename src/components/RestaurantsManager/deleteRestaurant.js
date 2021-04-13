import { gql } from '@apollo/client';

export const DELETE_RESTAURANT_MUTATION = gql`
    mutation deleteRestaurantMutation($_id: ID!) {
        deleteRestaurant(input: { _id: $_id }) {
            restaurant {
                _id
                name
                address
            }
        }
    }
`;
