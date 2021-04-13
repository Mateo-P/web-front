import { gql } from '@apollo/client';

export const ADD_ITEM_MUTATION = gql`
    mutation addItemMutation(
        $owner: String!
        $category: ID!
        $name: String!
        $description: String!
        $price: Float!
        $image: Upload
        $options: [ItemOptionInput]
    ) {
        addItem(
            input: {
                owner: $owner
                category: $category
                name: $name
                description: $description
                price: $price
                image: $image
                options: $options
            }
        ) {
            item {
                _id
                name
                description
                category
            }
        }
    }
`;
