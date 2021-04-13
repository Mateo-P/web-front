import { gql } from '@apollo/client';

export const ADD_IMAGE_USER = gql`
    mutation addUserImageMutation($email: String!, $image: Upload!) {
        addUserImage(input: { email: $email, image: $image }) {
            user {
                _id
                email
                image {
                    uri
                }
            }
        }
    }
`;
