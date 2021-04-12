import { gql } from '@apollo/client';

export const ADD_CATEGORY_MUTATION = gql`
    mutation addCategoryMutation($name: String!, $user: String!) {
        addCategory(input: { name: $name, user: $user }) {
            category {
                _id
                name
            }
        }
    }
`;
