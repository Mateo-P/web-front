import { gql } from '@apollo/client';

export const DELETE_CATEGORY = gql`
    mutation deleteCategory($_id: ID!) {
        deleteCategory(input: { _id: $_id }) {
            category {
                _id
                name
            }
        }
    }
`;
