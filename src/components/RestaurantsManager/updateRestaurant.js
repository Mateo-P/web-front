import { gql } from '@apollo/client';

export const UPDATE_RESTAURANT_MUTATION = gql`
    mutation updateRestaurantMutation($_id: ID!, $name: String, $address: String) {
        updateRestaurant(input: { _id: $_id, name: $name, address: $address }) {
            restaurant {
                _id
                name
                address
            }
        }
    }
`;
