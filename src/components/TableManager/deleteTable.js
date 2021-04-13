import { gql } from '@apollo/client';

export const DELETE_TABLE = gql`
    mutation DeleteTable($_id: ID!, $restaurant: ID!) {
        deleteTable(input: { _id: $_id, restaurant: $restaurant }) {
            tables {
                _id
                name
                top
                left
            }
        }
    }
`;
