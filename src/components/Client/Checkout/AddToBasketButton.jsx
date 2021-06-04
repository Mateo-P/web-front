import React from 'react';
import Button from '@material-ui/core/Button';
import { FormattedMessage } from 'react-intl';

export default function AddToBasketButton({ viewonly }) {
    return (
        <Button variant="contained" size="large" color="primary">
            {viewonly ? <FormattedMessage id="seeMore" /> : <FormattedMessage id="add" />}
        </Button>
    );
}
