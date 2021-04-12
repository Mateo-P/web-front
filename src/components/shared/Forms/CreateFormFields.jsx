import React from 'react';
import CurrencyTextField from '@unicef/material-ui-currency-textfield';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    field: {
        width: '100%'
    }
});

function CreateFormFields({ field, formValues, handleChange }) {
    const classes = useStyles();
    return (
        <>
            {field.currency ? (
                <CurrencyTextField
                    className={classes.field}
                    label={field.label}
                    variant="outlined"
                    id={field.label}
                    value={formValues[field.value]}
                    currencySymbol="$"
                    helperText={field.error}
                    //type={field.type}
                    minimumValue={0}
                    onChange={handleChange(field.value)}
                    decimalPlaces={0}
                    decimalCharacter=","
                    digitGroupSeparator="."
                    error={field.error ? true : false}
                />
            ) : (
                <TextField
                    className={classes.field}
                    error={field.error ? true : false}
                    onChange={handleChange(field.value)}
                    id={field.label}
                    label={field.label}
                    defaultValue=""
                    variant="outlined"
                    value={formValues[field.value]}
                    helperText={field.error}
                    type={field.type}
                />
            )}
        </>
    );
}

export default CreateFormFields;
