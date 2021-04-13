import { gql } from '@apollo/client';

export const UPDATE_TABLES = gql`
    mutation UpdateTable($_id: ID!, $name: String, $top: Int, $left: Int) {
        updateTable(input: { _id: $_id, name: $name, top: $top, left: $left }) {
            table {
                _id
                name
                top
                left
            }
        }
    }
`;
