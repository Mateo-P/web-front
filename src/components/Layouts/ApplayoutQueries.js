import { gql } from '@apollo/client';
export const FIND_TABLENAME_BY_ID = gql`
    query findTable($_id: ID!) {
        findTable(input: { _id: $_id }) {
            table {
                _id
                name
            }
        }
    }
`;
