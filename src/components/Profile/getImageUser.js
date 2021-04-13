import { gql } from '@apollo/client';

export const GET_USER_INFO = gql`
    query getUserInfo($email: String!) {
        user(email: $email) {
            _id
            email
            image {
                uri
            }
        }
    }
`;