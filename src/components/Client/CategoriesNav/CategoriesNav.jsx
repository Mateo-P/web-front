import { useState, useRef } from 'react';
import ScrollMenu from 'react-horizontal-scrolling-menu';
import CategoryMenu from './CategoryMenu';

export default function Categories({ categories }) {
    const [value, setValue] = useState(0);
    const el = useRef(null);

    const handleChange = (_, newValue) => {
        setValue(newValue);
    };

    const onSelect = (key) => {
        handleChange(null, key);
    };

    return (
        <ScrollMenu
            ref={el}
            hideArrows
            data={CategoryMenu(categories, value, handleChange)}
            selected={value.toString()}
            hideSingleArrow
            scrollToSelected
            onSelect={onSelect}
            translate={6}
            xPoint={10}
        />
    );
}
