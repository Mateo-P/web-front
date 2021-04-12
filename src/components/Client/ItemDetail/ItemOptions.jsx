import React from 'react';
import ItemOption from './ItemOption';

export default function ItemOptions({ options, viewonly }) {
    return options.map((option, i) => (
        <ItemOption key={option.name + i} option={option} viewonly={viewonly} />
    ));
}
