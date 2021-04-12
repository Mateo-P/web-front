import CategoryItem from './CategoryItem';

export const Menu = (list, selected, handleChange) =>
    list.map((el, index) => {
        const { name } = el;

        return (
            <CategoryItem
                text={name}
                key={index}
                selected={selected}
                index={index}
                handleSetActive={handleChange}
            />
        );
    });

export default function CategoryMenu(list, selected, handleChange) {
    return Menu(list, selected, handleChange);
}
