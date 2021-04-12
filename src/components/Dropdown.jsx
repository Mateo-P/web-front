import { useRef, useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles((theme) => ({
    formControl: {
        minWidth: 120,
        margin: theme.spacing(1)
    },
    selectEmpty: {
        marginTop: theme.spacing(2)
    }
}));

export default function Dropdown({ name, items, hook }) {
    const classes = useStyles();
    const [currentValue, setCurrentValue] = hook;

    const inputLabel = useRef(null);
    const [labelWidth, setLabelWidth] = useState(0);
    useEffect(() => {
        setLabelWidth(inputLabel.current.offsetWidth);
    }, []);

    const handleChange = (event) => {
        setCurrentValue(event.target.value);
    };

    return (
        <FormControl color="secondary" variant="outlined" className={classes.formControl}>
            <InputLabel ref={inputLabel} id="demo-simple-select-outlined-label">
                {name ? name : 'Dropdown'}
            </InputLabel>
            <Select
                labelId="demo-simple-select-outlined-label"
                id={currentValue.name}
                value={currentValue}
                onChange={handleChange}
                labelWidth={labelWidth}>
                {items
                    ? items.map((item, i) => (
                          <MenuItem key={i} value={item}>
                              {item.name}
                          </MenuItem>
                      ))
                    : 'No hay opciones'}
            </Select>
        </FormControl>
    );
}
