import { useState } from 'react';
import ItemOptionsHeader from './ItemOptionsHeader';
import ItemOptionsList from './ItemOptionsList';
import CreateEditField from 'components/shared/Forms/CreateEditField';
import { useStateValue } from 'State/StateProvider';
import validateOptions from './validateOptions';
import fetcher from 'shared/fetcher';

const CreateFields = [{ label: 'Nombre', value: 'name', error: null }];
const initialOption = { name: '', choices: [], min: 0, max: 1, not_available_at: [] };

export default function ItemOptions() {
    const [openCreateOption, setOpenCreateOption] = useState(false);

    const [option, setOption] = useState(initialOption);
    const [{ item, token }, dispatch] = useStateValue();
    const handleCreateOption = () => {
        setOpenCreateOption(true);
    };

    const onCreateOption = async () => {
        if (validateOptions(option)) {
            if (item.options === null) {
                item.options = [];
            }

            option.item = item.id;

            let newOptions = [...item.options, option];

            //create option

            await fetcher('menu/options/', 'POST', token, option);

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
