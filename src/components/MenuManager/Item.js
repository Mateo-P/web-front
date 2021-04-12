import fetcher from 'shared/fetcher';
import { mutate } from 'swr';

export const updateItem = async (item, token) => {
    if (item.file) {
        item.image = item.file;
    } else {
        item.image = undefined;
    }

    await fetcher(`menu/items/${item.id}/`, 'PATCH', token, item);

    mutate('menu/');
};

export const deleteItem = async (id, token) => {
    await fetcher(`menu/items/${id}/`, 'DELETE', token);
    mutate('menu/');
};
