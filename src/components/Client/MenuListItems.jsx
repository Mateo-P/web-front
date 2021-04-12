import Item from '../Item/Item';
import useLogoUri from 'components/shared/useLogoUri';

export default function MenuListItems({ items, viewonly }) {
    const { logoUri } = useLogoUri();

    return items.map((item, i) => (
        <Item {...item} key={i} viewonly={viewonly} image={item.image ? item.image : logoUri} />
    ));
}
