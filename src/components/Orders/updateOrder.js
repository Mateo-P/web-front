import { gql } from '@apollo/client';

export const UPDATE_ORDER = gql`
    mutation updateOrder($_id: ID!, $state: String!) {
        updateOrder(input: { _id: $_id, state: $state }) {
            order {
                _id
                state
            }
        }
    }
`;
