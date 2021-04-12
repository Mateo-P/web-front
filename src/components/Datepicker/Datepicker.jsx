import React from 'react';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        minWidth: 120,
        margin: theme.spacing(1)
    }
}));

export default function Datepicker({ useDate, label }) {
    const classes = useStyles();
    const [selectedDate, setSelectedDate] = useDate;

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
                className={classes.root}
                inputVariant="outlined"
                id="date-picker-dialog"
                label={label}
                format="MM/dd/yyyy"
                value={selectedDate}
                onChange={handleDateChange}
                KeyboardButtonProps={{
                    'aria-label': 'change date'
                }}
            />
        </MuiPickersUtilsProvider>
    );
}
