import React from 'react';
import Grid from '@material-ui/core/Grid';
import CreateFormFields from './CreateFormFields';

export default function Createform({ fields, handleChange, formValues, children }) {
    const morethan1field = fields.length > 1 ? 6 : 12;

    return (
        <Grid container spacing={1}>
            {fields.map((field, i) => {
                return (
                    <Grid item xs={12} sm={morethan1field} key={i}>
                        <CreateFormFields
                            field={field}
                            handleChange={handleChange}
                            formValues={formValues}
                        />
                    </Grid>
                );
            })}
            <Grid item xs={12}>
                {children}
            </Grid>
        </Grid>
    );
}
