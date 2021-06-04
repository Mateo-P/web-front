import { useState, useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import ItemEntry from './ItemEntry';
import List from '@material-ui/core/List';
import { useStateValue } from '../../../State/StateProvider';
import Chip from 'components/shared/Chip';
import { FormattedMessage } from 'react-intl';

export default function ItemOption({ option, viewonly }) {
    const isOptionMandatory = option.min >= 1;
    const isSingleSelection = option.max === 1;
    const isMaxBelowTotalEntries = option.max < option.entries.length && !isSingleSelection;

    const [selectedEntries, setSelectedEntries] = useState([]);
    const dispatch = useStateValue()[1];

    const options = {
        name: option.name,
        entries: selectedEntries.map((i) => {
            let { name, price } = option.entries[i];
            return { name, price };
        })
    };
    useEffect(() => {
        dispatch({
            type: 'SET_SELECTED_OPTIONS',
            newOption: options
        });
    }, [selectedEntries]);

    const selectEntry = (newEntry) => {
        const numberOfSelectedEntries = selectedEntries.length;

        const currentIndex = selectedEntries.indexOf(newEntry);

        const newSelectedEntries = [...selectedEntries];

        if (currentIndex === -1) {
            if (isSingleSelection && numberOfSelectedEntries === 1) {
                newSelectedEntries[0] = newEntry;
            }
            if (numberOfSelectedEntries < option.max) {
                newSelectedEntries.push(newEntry);

                //notificacion: no puede seleccionar una mas!
            }
        } else {
            if (numberOfSelectedEntries >= option.min) {
                newSelectedEntries.splice(currentIndex, 1);
            }
        }

        setSelectedEntries(newSelectedEntries);
    };

    return (
        <>
            <Box display="flex" alignItems="center">
                <Typography variant="h5">{option.name}</Typography>
                {isOptionMandatory && <Chip label="Obligatorio" width="20px" />}
            </Box>
            {isMaxBelowTotalEntries && (
                <Typography variant="h6">
                    <FormattedMessage id="selectTo" /> {option.max}{' '}
                    <FormattedMessage id="options" />
                </Typography>
            )}
            <List dense>
                {option.entries.map((entry, i) => (
                    <ItemEntry
                        key={`${option.name}${i}`}
                        entry={entry}
                        value={i}
                        setSelectedEntries={selectEntry}
                        selectedEntries={selectedEntries}
                        isSingleSelection={isSingleSelection}
                        viewonly={viewonly}
                    />
                ))}
            </List>
        </>
    );
}
