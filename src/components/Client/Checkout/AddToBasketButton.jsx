import React from 'react';
import Button from '@material-ui/core/Button';

export default function AddToBasketButton({ viewonly }) {
    return (
        <Button variant="contained" size="large" color="primary">
            {viewonly ? 'Ver más' : 'Añadir'}
        </Button>
    );
}
