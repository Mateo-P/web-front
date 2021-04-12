import { useState } from 'react';
import { useStateValue } from '../../../../State/StateProvider';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { formatCurrency } from '../../../../shared/currencyFormat';
import EditAndDeleteMenu from '../../../shared/EditAndDeleteMenu';
import CreateEditField from 'components/shared/Forms/CreateEditField';
import validateOptions from '../validateOptions';

const EditFields = [
    { label: 'Opcion', value: 'name', error: null },
    { label: 'Precio', value: 'price', error: null, currency: true }
];
export default function Entry({ name, price }) {
    const [{ item }, dispatch] = useStateValue();
    const [edit, setEdit] = useState(false);
    const [entry, setEntry] = useState({});
    const handleDeleteOption = () => {
        let filteredOptions = item.options.map((option) => {
            let choices = option.choices.filter((entry) => entry.name !== name);
            return { ...option, choices };
        });

        dispatch({
            type: 'SET_ATRIBUTE_TO_ITEM',
            value: 'options',
            payload: filteredOptions
        });
    };
    const handleOpenEdit = () => {
        setEdit(true);
        setEntry({ name, price });
    };
    const onEditEntry = () => {
        if (validateOptions(entry)) {
            let newOptions = item.options.map((option) => {
                let newChoices = option.choices.map((tempEntry) => {
                    if (tempEntry.name === name) {
                        let { name, price } = entry;
                        return { __typename: 'Entrie', name, price };
                    }
                    return tempEntry;
                });
                return { ...option, choices: newChoices };
            });

            dispatch({
                type: 'SET_ATRIBUTE_TO_ITEM',
                value: 'options',
                payload: newOptions
            });
        }
        setEdit(false);
        setEntry({});
    };
    const handleChange = (value) => (e) => {
        let newValueField =
            value === 'price' ? parseInt(e.target.value.replace(/[ ,.]/g, '')) : e.target.value;
        setEntry({ ...entry, [value]: newValueField });
    };
    return (
        <>
            {edit && (
                <ListItem>
                    <CreateEditField
                        fields={EditFields}
                        optionValues={entry}
                        handleChange={handleChange}
                        onClick={onEditEntry}
                        validation={validateOptions(entry)}
                    />
                </ListItem>
            )}
            <ListItem>
                <ListItemText
                    primary={name}
                    secondary={price ? `${formatCurrency(price)} +` : 'Sin costos'}
                />
                <EditAndDeleteMenu
                    handleOpenDelete={handleDeleteOption}
                    handleOpenEdit={handleOpenEdit}
                />
            </ListItem>
        </>
    );
}
