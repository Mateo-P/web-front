import Item from '../Item/Item';
import useOwnerInfo from './useOwnerInfo';
import { COMPLEAT_LOGO_URI } from 'shared/constants';

export default function MenuListItems({ items, viewonly, restaurantId }) {
    const { user } = useOwnerInfo(restaurantId);

    return items.map((item, i) => (
        <Item
            {...item}
            key={i}
            viewonly={viewonly}
            image={
                item.image
                    ? item.image.uri
                    : !user
                    ? COMPLEAT_LOGO_URI
                    : user.image
                    ? user.image.uri
                    : COMPLEAT_LOGO_URI
            }
        />
    ));
}
