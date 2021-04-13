import { gql } from '@apollo/client';

export const ADD_RESTAURANT_MUTATION = gql`
    mutation addRestaurantMutation($name: String!, $address: String!, $email: String!) {
        addRestaurant(input: { name: $name, address: $address, owner: $email }) {
            restaurant {
                _id
                name
                address
                owner {
                    email
                }
            }
        }
    }
`;
