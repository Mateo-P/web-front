import React from 'react';
import MenuCRUD from '../MenuManager/MenuCRUD';
import { useStateValue } from 'State/StateProvider';
import fetcher from 'shared/fetcher';

const manageItemAvailability = (categories, restaurantId) => {
    const newCategories = categories;
    const result = newCategories?.map((cat) => {
        let newCategory = { ...cat };
        let newItems = newCategory.items.map((item) => {
            let available;
            if (item.not_available_at && item.not_available_at.includes(restaurantId)) {
                available = false;
            } else {
                available = true;
            }
            return { ...item, available };
        });

        return { ...cat, items: newItems };
    });

    return result;
};

function AvailabilityManager({ categories, restaurant }) {
    const itemsWithAvailability = manageItemAvailability(categories, restaurant.id);
    const [{ token }] = useStateValue();

    const handleAvailableChange = async ({ id }, newAvailableState) => {
        let operation = '';

        if (newAvailableState === true) {
            operation = 'remove';
        } else if (newAvailableState === false) {
            operation = 'add';
        }

        await fetcher(`menu/not_available_venue`, 'POST', token, {
            item_id: id,
            venue_id: restaurant.id,
            operation
        });
    };

    return (
        <MenuCRUD
            handleAvailableChange={handleAvailableChange}
            availability={true}
            editable={false}
            categories={itemsWithAvailability}
        />
    );
}

export default AvailabilityManager;
