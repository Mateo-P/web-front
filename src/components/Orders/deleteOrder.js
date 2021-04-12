import { gql } from '@apollo/client';

export const DELETE_ORDER = gql`
    mutation deleteOrder($_id: ID!) {
        deleteOrder(input: { _id: $_id }) {
            order {
                _id
            }
        }
    }
`;
