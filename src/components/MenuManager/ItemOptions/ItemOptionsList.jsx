import React from 'react';
import ItemOption from './Option';

export default function ItemOptionsList({ handleEdit, options }) {
    return (
        <>
            {options?.map((option, i) => (
                <ItemOption key={`option${i}`} handleEdit={handleEdit} {...option} />
            ))}
        </>
    );
}
