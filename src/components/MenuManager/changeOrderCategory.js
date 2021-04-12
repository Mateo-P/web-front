import { gql } from '@apollo/client';

export const CHANGE_ORDER_MUTATION = gql`
    mutation changeOderMutation($_id: ID!, $position: Int!) {
        changeCategoryOrder(input: { _id: $_id, position: $position }) {
            categories {
                _id
                name
            }
        }
    }
`;
