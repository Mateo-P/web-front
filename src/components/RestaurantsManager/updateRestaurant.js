import { gql } from '@apollo/client';

export const UPDATE_RESTAURANT_MUTATION = gql`
    mutation updateRestaurantMutation($_id: ID!, $name: String, $phone: String, $address: String) {
        updateRestaurant(input: { _id: $_id, name: $name, address: $address, phone: $phone }) {
            restaurant {
                _id
                name
                address
                phone
            }
        }
    }
`;
