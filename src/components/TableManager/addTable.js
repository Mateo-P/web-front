import { gql } from '@apollo/client';

export const ADD_TABLE = gql`
    mutation addTable($name: String!, $top: Int!, $left: Int!, $restaurant: ID!) {
        addTable(input: { name: $name, top: $top, left: $left, restaurant: $restaurant }) {
            table {
                _id
                name
                top
                left
            }
        }
    }
`;
