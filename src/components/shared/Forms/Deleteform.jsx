import React from 'react';
import Typography from '@material-ui/core/Typography';

export default function DeleteForm({ message }) {
    return (
        <Typography variant="h5" component="h2">
            {message}
        </Typography>
    );
}
