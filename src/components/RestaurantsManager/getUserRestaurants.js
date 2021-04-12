import { gql } from '@apollo/client';

export const GET_USER_RESTAURANTS = gql`
    query getUserRestaurants($email: String!) {
        restaurantsByOwner(owner: $email) {
            _id
            name
            address
            phone
            tables {
                _id
                name
                top
                left
            }
        }
    }
`;
