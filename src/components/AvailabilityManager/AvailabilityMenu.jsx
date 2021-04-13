import React from 'react';
import { gql, useMutation } from '@apollo/client';
import MenuCRUD from '../MenuManager/MenuCRUD';

const ADD_RESTAURANT_TO_ITEM_MUTATION = gql`
    mutation addRestaurantAvailabityToItemMutation($_id: ID!, $restaurantId: ID!) {
        addRestaurantAvailabityToItem(input: { _id: $_id, restaurantId: $restaurantId }) {
            item {
                _id
                name
                availableAt
            }
        }
    }
`;

const REMOVE_RESTAURANT_TO_ITEM_MUTATION = gql`
    mutation removeRestaurantAvailabityToItemMutation($_id: ID!, $restaurantId: ID!) {
        removeRestaurantAvailabityToItem(input: { _id: $_id, restaurantId: $restaurantId }) {
            item {
                _id
                name
                availableAt
            }
        }
    }
`;

const manageItemAvailability = (menu, restaurantId) => {
    const newMenu = { ...menu };
    const result = newMenu.categories?.map((cat) => {
        let newCategory = { ...cat };
        let newItems = newCategory.items.map((item) => {
            let available;
            if (item.availableAt && item.availableAt.includes(restaurantId)) {
                available = true;
            } else {
                available = false;
            }
            return { ...item, available };
        });

        return { ...cat, items: newItems };
    });

    return { ...menu, categories: result };
};

function AvailabilityManager({ user, restaurant }) {
    //const { categories } = user;

    const [addRestaurantAvailabityToItemMutation] = useMutation(ADD_RESTAURANT_TO_ITEM_MUTATION);
    const [removeRestaurantAvailabityToItemMutation] = useMutation(
        REMOVE_RESTAURANT_TO_ITEM_MUTATION
    );

    const itemsWithAvailability = manageItemAvailability(user, restaurant._id);
    const handleAvailableChange = (_id, newAvailableState) => {
        if (newAvailableState === true) {
            addRestaurantAvailabityToItemMutation({
                variables: {
                    _id: _id,
                    restaurantId: restaurant._id
                }
            });
        } else if (newAvailableState === false) {
            removeRestaurantAvailabityToItemMutation({
                variables: {
                    _id: _id,
                    restaurantId: restaurant._id
                }
            });
        }
    };

    return (
        <MenuCRUD
            handleAvailableChange={handleAvailableChange}
            availability={true}
            editable={false}
            user={itemsWithAvailability}
        />
    );
}

export default AvailabilityManager;
