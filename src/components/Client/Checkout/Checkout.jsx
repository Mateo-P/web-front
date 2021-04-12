import React from 'react';
import CheckoutItem from './CheckoutItem';
import { formatCurrency } from '../../../shared/currencyFormat';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Createform from '../../shared/Forms/Createform';
import { createStyles, makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() =>
    createStyles({
        total: {
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
        }
    })
);

export default function Checkout({ itemsBasket, total, formFields, formValues, handleChange }) {
    const classes = useStyles();
    return (
        <>
            {itemsBasket.map((item) => (
                <CheckoutItem key={item._id} item={item} />
            ))}
            <Box
                display="flex"
                flexDirection="column"
                justifyContent="space-between"
                alignItems="flex-start">
                <div className={classes.total}>
                    <Typography variant="h5" gutterBottom>
                        Total:
                    </Typography>
                    <Typography variant="h4" gutterBottom>
                        {formatCurrency(total)}
                    </Typography>
                </div>

                <Createform
                    fields={formFields}
                    handleChange={handleChange}
                    formValues={formValues}
                />
            </Box>
        </>
    );
}
