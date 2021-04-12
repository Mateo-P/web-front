import { gql } from '@apollo/client';

export const GET_USER_MENU = gql`
    query getUserMenu($email: String!) {
        user(email: $email) {
            _id
            email
            categories {
                _id
                name
                items {
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
                    image {
                        uri
                        filename
                    }
                    availableAt
                }
            }
        }
    }
`;
