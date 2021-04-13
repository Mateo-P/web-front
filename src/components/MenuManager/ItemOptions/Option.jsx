import { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import MinMaxSelector from './ItemEntry/MinMaxSelector';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import EditAndDeleteMenu from '../../shared/EditAndDeleteMenu';
import CreateEditField from 'components/shared/Forms/CreateEditField';
import { useStateValue } from '../../../State/StateProvider';
import validateOptions from './validateOptions';
import ItemEntry from './ItemEntry';

const useStyles = makeStyles({
    optionTitle: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    optionCrud: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start'
    }
});

const initialOption = { name: '' };

const editField = [{ label: 'Nombre...', value: 'name', error: null }];

export default function Option({ name, min, max, entries }) {
    const classes = useStyles();
    const [edit, setEdit] = useState(false);
    const [openCreateEntry, setOpenCreateEntry] = useState(false);
    const [formValues, setFormValues] = useState(initialOption);
    const [{ item }, dispatch] = useStateValue();

    const handleCreateEntry = () => {
        setFormValues(initialOption);
        setOpenCreateEntry(!openCreateEntry);
    };

    const handleChange = (value) => (e) => {
        let newValueField =
            value === 'price' ? parseInt(e.target.value.replace(/[ ,.]/g, '')) : e.target.value;
        setFormValues({ ...formValues, [value]: newValueField });
    };

    const handleEditOption = () => {
        setFormValues({ name, entries, min, max });
        setEdit(true);
    };

    const onEdit = () => {
        if (validateOptions(formValues)) {
            if (item.options === null) {
                item.options = [];
            }
            let newOptions = item.options.map((tempOption) => {
                if (tempOption.name === name) {
                    return formValues;
                }
                return tempOption;
            });

            dispatch({
                type: 'SET_ATRIBUTE_TO_ITEM',
                value: 'options',
                payload: newOptions
            });
            setEdit(false);
            setFormValues(initialOption);
        }
    };

    const onChangeMinMax = (max) => (value) => {
        let newOptions = item.options.map((tempOption) => {
            if (tempOption.name === name) {
                if (max) {
                    return { ...tempOption, max: value };
                } else {
                    return { ...tempOption, min: value };
                }
            }
            return tempOption;
        });

        dispatch({
            type: 'SET_ATRIBUTE_TO_ITEM',
            value: 'options',
            payload: newOptions
        });
    };

    const handleDeleteOption = () => {
        let filteredOptions = item.options.filter((option) => option.name !== name);

        dispatch({
            type: 'SET_ATRIBUTE_TO_ITEM',
            value: 'options',
            payload: filteredOptions
        });
    };

    return (
        <div>
            {edit && (
                <CreateEditField
                    fields={editField}
                    optionValues={formValues}
                    handleChange={handleChange}
                    onClick={onEdit}
                    validation={validateOptions(formValues)}
                />
            )}
            <div className={classes.optionTitle}>
                <div className={classes.optionCrud}>
                    <Typography variant="h6">{name}</Typography>
                    <IconButton color="secondary" onClick={handleCreateEntry}>
                        <AddIcon />
                    </IconButton>
                    <EditAndDeleteMenu
                        handleOpenDelete={handleDeleteOption}
                        handleOpenEdit={handleEditOption}
                    />
                </div>
                <MinMaxSelector
                    min={min}
                    setMin={onChangeMinMax(false)}
                    setMax={onChangeMinMax(true)}
                    max={max}
                />
            </div>
            <ItemEntry
                entries={entries}
                openCreateEntry={openCreateEntry}
                setOpenCreateEntry={setOpenCreateEntry}
                optionName={name}
            />
        </div>
    );
}
