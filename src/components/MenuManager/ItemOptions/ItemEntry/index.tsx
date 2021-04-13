import { useState } from 'react';
import EntriesList from './EntriesList';
import { useStateValue } from '../../../../State/StateProvider';
import CreateEditField from '../../../shared/Forms/CreateEditField';
import validateEntry from './validateEntry';
import Entry from './typeEntry';

const entryFields = [
    { label: 'Nombre...', value: 'name', error: null },
    { label: 'Precio...', value: 'price', error: null, currency: true }
];

type Props = {
    optionName: string;
    entries: Array<Entry>;
    openCreateEntry: boolean;
    setOpenCreateEntry: (openCreateEntry: boolean) => void;
};

const initialValue = { name: '' };

export default function ItemEntry({
    optionName,
    entries,
    openCreateEntry,
    setOpenCreateEntry
}: Props) {
    const [formValues, setFormValues] = useState(initialValue);
    const [{ item }, dispatch] = useStateValue();

    const onCreateEntry = () => {
        if (validateEntry(formValues)) {
            setOpenCreateEntry(false);
            let newOptions = item.options.map((option) => {
                if (option.name === optionName) {
                    if (!option.entries) {
                        option.entries = [];
                    }

                    return { ...option, entries: [...option.entries, formValues] };
                }
                return option;
            });

            dispatch({
                type: 'SET_ATRIBUTE_TO_ITEM',
                value: 'options',
                payload: newOptions
            });
        } else {
            setOpenCreateEntry(!openCreateEntry);
        }

        setFormValues(initialValue);
    };

    const handleChange = (value: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
        let newValueField =
            value === 'price' ? parseInt(e.target.value.replace(/[ ,.]/g, '')) : e.target.value;
        setFormValues({ ...formValues, [value]: newValueField });
    };

    return (
        <>
            {openCreateEntry && (
                <CreateEditField
                    fields={entryFields}
                    optionValues={formValues}
                    handleChange={handleChange}
                    onClick={onCreateEntry}
                    validation={validateEntry(formValues)}
                />
            )}
            <EntriesList entries={entries} />
        </>
    );
}
