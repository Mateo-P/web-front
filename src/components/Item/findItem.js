import { gql } from '@apollo/client';

export const FIND_ITEM = gql`
    query FindItem($_id: ID) {
        findItem(input: { _id: $_id }) {
            item {
                _id
                name
                description
                price

                options {
                    name
                    min
                    max
                    entries {
                        name
                        price
                    }
                }
            }
        }
    }
`;
