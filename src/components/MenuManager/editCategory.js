import { gql } from '@apollo/client';

export const EDIT_CATEGORY = gql`
    mutation deleteCategory($_id: ID!, $name: String!) {
        editCategory(input: { _id: $_id, name: $name }) {
            category {
                _id
                name
            }
        }
    }
`;
