import { gql } from '@apollo/client';

export const GET_BILLS_BY_RESTAURANTS = gql`
    query billsByRestaurant($states: [String]!, $restaurant: ID!) {
        billsByRestaurant(input: { states: $states, restaurant: $restaurant }) {
            _id

            state
            orders {
                item {
                    name
                    price
                }
                table {
                    name
                }
                quantity
                clientName
                clientPhone
            }
            tip
            paymentMethod
            tax
            subTotal
            total
        }
    }
`;
