import { gql } from '@apollo/client';

export const ADD_RESTAURANT_MUTATION = gql`
    mutation addRestaurantMutation(
        $name: String!
        $address: String!
        $phone: String
        $email: String!
    ) {
        addRestaurant(input: { name: $name, address: $address, phone: $phone, owner: $email }) {
            restaurant {
                _id
                name
                address
                phone
                owner {
                    email
                }
            }
        }
    }
`;
