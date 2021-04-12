import React from 'react';
import List from '@material-ui/core/List';
import Entrie from './Entry';
export default function EntriesList({ choices = [] }) {
    return (
        <List dense>
            {choices.map((entry, i) => (
                <Entrie key={entry.name + i} {...entry} />
            ))}
        </List>
    );
}
