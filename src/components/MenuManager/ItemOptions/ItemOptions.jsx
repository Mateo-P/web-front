import { useState } from 'react';
import ItemOptionsHeader from './ItemOptionsHeader';
import ItemOptionsList from './ItemOptionsList';
import CreateEditField from 'components/shared/Forms/CreateEditField';
import { useStateValue } from 'State/StateProvider';
import validateOptions from './validateOptions';

const CreateFields = [{ label: 'Nombre', value: 'name', error: null }];
const initialOption = { name: '', entries: [], min: 0, max: 1 };

export default function ItemOptions() {
    const [openCreateOption, setOpenCreateOption] = useState(false);

    const [option, setOption] = useState(initialOption);
    const [{ item }, dispatch] = useStateValue();
    const handleCreateOption = () => {
        setOpenCreateOption(true);
    };

    const onCreateOption = () => {
        if (validateOptions(option)) {
            if (item.options === null) {
                item.options = [];
            }

            let newOptions = [...item.options, option];

            dispatch({
                type: 'SET_ATRIBUTE_TO_ITEM',
                value: 'options',
                payload: newOptions
            });
            setOption(initialOption);
        }
        setOpenCreateOption(!openCreateOption);
    };

    const handleChange = (value) => (e) => {
        setOption({ ...option, [value]: e.target.value });
    };

    return (
        <>
            <ItemOptionsHeader handleCreateOption={handleCreateOption} />
            {openCreateOption && (
                <CreateEditField
                    fields={CreateFields}
                    optionValues={option}
                    handleChange={handleChange}
                    validation={validateOptions(option)}
                    onClick={onCreateOption}
                />
            )}
            <ItemOptionsList options={item.options} />
        </>
    );
}
