import { gql } from '@apollo/client';

export const GET_USER_RESTAURANTS = gql`
    query getUserRestaurants($email: String!) {
        restaurantsByOwner(owner: $email) {
            _id
            name
            address
            tables {
                _id
                name
                top
                left
            }
        }
    }
`;
