import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { formatCurrency } from 'shared/currencyFormat';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Checkbox from '@material-ui/core/Checkbox';
import Radio from '@material-ui/core/Radio';

export default function ItemEntry({
    entry,
    value,
    selectedEntries,
    setSelectedEntries,
    isSingleSelection,
    viewonly
}) {
    return (
        <ListItem>
            <ListItemText
                primaryTypographyProps={{ variant: 'subtitle1' }}
                primary={entry.name}
                secondary={entry.price ? formatCurrency(entry.price) + ' +' : 'Sin costos'}
            />
            <ListItemSecondaryAction>
                {!viewonly && (
                    <>
                        {isSingleSelection ? (
                            <Radio
                                checked={selectedEntries.indexOf(value) !== -1}
                                onClick={() => setSelectedEntries(value)}
                                edge="end"
                                name="radio-button-demo"
                                inputProps={{ 'aria-label': entry.name }}
                            />
                        ) : (
                            <Checkbox
                                onChange={() => setSelectedEntries(value)}
                                edge="end"
                                checked={selectedEntries.indexOf(value) !== -1}
                                inputProps={{ 'aria-labelledby': entry.name }}
                            />
                        )}
                    </>
                )}
            </ListItemSecondaryAction>
        </ListItem>
    );
}
