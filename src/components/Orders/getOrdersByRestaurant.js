import { gql } from '@apollo/client';

export const GET_ORDERS_BY_RESTAURANTS = gql`
    query ordersByRestaurant($states: [String]!, $restaurant: ID!) {
        ordersByRestaurant(input: { states: $states, restaurant: $restaurant }) {
            _id
            restaurant
            quantity
            createdTime
            state
            table {
                _id
                name
            }
            item {
                name
                price
                options {
                    name
                    entries {
                        name
                    }
                }
            }
            image
            clientName
        }
    }
`;
